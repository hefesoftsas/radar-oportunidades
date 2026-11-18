import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const canonical = values => values.map(value => JSON.stringify(Object.fromEntries(Object.entries(value).sort(([a],[b]) => a.localeCompare(b))))).sort();
const equal = (left,right) => JSON.stringify(canonical(left)) === JSON.stringify(canonical(right));

// Docker Compose may represent a mount as a legacy bind even though Docker's
// effective Mounts list exposes it in the same way as a structured mount.
export function compareContainer(actual, expectedMounts, expectedPorts) {
  if (!Array.isArray(actual.mounts) || !Array.isArray(expectedMounts) || !Array.isArray(expectedPorts) || typeof actual.publishAll !== 'boolean' || !Object.hasOwn(actual,'ports') || (actual.ports !== null && (typeof actual.ports !== 'object' || Array.isArray(actual.ports)))) throw Error('Invalid inspection');
  if (actual.mounts.some(m => !m || typeof m.Type !== 'string' || typeof m.Destination !== 'string' || typeof m.RW !== 'boolean' || typeof (m.Type === 'volume' ? m.Name : m.Source) !== 'string')) throw Error('Invalid mount');
  const mounts = actual.mounts.map(mount => ({
    type: mount.Type,
    source: mount.Type === 'volume' ? mount.Name : mount.Source,
    target: mount.Destination,
    readOnly: mount.RW === false,
  }));
  const ports = [];
  for (const [internal, bindings] of Object.entries(actual.ports || {})) {
    if (bindings === null) continue;
    if (!Array.isArray(bindings)) throw Error('Invalid port bindings');
    for (const binding of bindings) {
      if (!binding || typeof binding.HostIp !== 'string' || typeof binding.HostPort !== 'string') throw Error('Invalid port binding');
      ports.push({internal,ip:binding.HostIp || '0.0.0.0',external:binding.HostPort});
    }
  }
  return {mountsOk:equal(mounts,expectedMounts),portsOk:!actual.publishAll && equal(ports,expectedPorts)};
}

function runDocker(host,args) {
  return execFileSync('docker',['--host',host,...args],{encoding:'utf8',timeout:30000,maxBuffer:2*1024*1024,stdio:['ignore','pipe','pipe']});
}

export function inspectContainers(config,run=runDocker) {
  const failure={inspection_ok:'false',app_exists:'false',browser_exists:'false',app_mounts_ok:'false',app_ports_ok:'false',browser_mounts_ok:'false',browser_ports_ok:'false'};
  try {
    if (!config.dockerHost || !config.appName || !config.browserName || config.appName===config.browserName) throw Error('Invalid configuration');
    const names=new Set(run(config.dockerHost,['container','ls','--all','--format','{{.Names}}']).split(/\r?\n/).filter(Boolean));
    const result={...failure,inspection_ok:'true'};
    const format='{"mounts":{{json .Mounts}},"ports":{{json .HostConfig.PortBindings}},"publishAll":{{json .HostConfig.PublishAllPorts}}}';
    for(const [key,name,mounts,ports] of [['app',config.appName,config.appMounts,config.appPorts],['browser',config.browserName,config.browserMounts,config.browserPorts]]) {
      if (!names.has(name)) continue;
      const actual=JSON.parse(run(config.dockerHost,['container','inspect','--format',format,name]));
      const compared=compareContainer(actual,mounts,ports);
      result[key+'_exists']='true';result[key+'_mounts_ok']=String(compared.mountsOk);result[key+'_ports_ok']=String(compared.portsOk);
    }
    return result;
  } catch {
    // The external-provider protocol must not expose paths, credentials or
    // Docker output in plan diagnostics or state.
    return failure;
  }
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  let result;
  try {
    let input='';for await (const chunk of process.stdin) input+=chunk;
    const query=JSON.parse(input);
    result=inspectContainers({dockerHost:query.docker_host,appName:query.app_name,browserName:query.browser_name,
      appMounts:JSON.parse(query.app_mounts),appPorts:JSON.parse(query.app_ports),browserMounts:JSON.parse(query.browser_mounts),browserPorts:[]});
  } catch {
    result={inspection_ok:'false',app_exists:'false',browser_exists:'false',app_mounts_ok:'false',app_ports_ok:'false',browser_mounts_ok:'false',browser_ports_ok:'false'};
  }
  process.stdout.write(JSON.stringify(result));
}
