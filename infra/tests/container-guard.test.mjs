import test from 'node:test';
import assert from 'node:assert/strict';
import {compareContainer, inspectContainers} from '../scripts/container-guard.mjs';
const mounts=[{type:'volume',source:'project_data',target:'/data',readOnly:false},{type:'bind',source:'/private/key',target:'/run/secrets/key',readOnly:true}];
const ports=[{internal:'8096/tcp',ip:'127.0.0.1',external:'8096'},{internal:'8097/tcp',ip:'127.0.0.1',external:'8097'}];
const snapshot={mounts:[{Type:'volume',Name:'project_data',Source:'/var/lib/docker/volumes/project_data/_data',Destination:'/data',RW:true},{Type:'bind',Source:'/private/key',Destination:'/run/secrets/key',RW:false}],ports:{'8096/tcp':[{HostIp:'127.0.0.1',HostPort:'8096'}],'8097/tcp':[{HostIp:'127.0.0.1',HostPort:'8097'}]},publishAll:false};
test('acepta montajes y puertos efectivos aunque Compose use binds',()=>{assert.deepEqual(compareContainer(snapshot,mounts,ports),{mountsOk:true,portsOk:true})});
test('detecta el cambio de volumen o de acceso al archivo de credencial',()=>{for(const changed of [{...snapshot,mounts:[{...snapshot.mounts[0],Name:'otro'},snapshot.mounts[1]]},{...snapshot,mounts:[snapshot.mounts[0],{...snapshot.mounts[1],RW:true}]},{...snapshot,mounts:[snapshot.mounts[0]]}])assert.equal(compareContainer(changed,mounts,ports).mountsOk,false)});
test('detecta puertos cambiados, adicionales, abiertos a toda la red y publicación automática',()=>{for(const changed of [{...snapshot,ports:{...snapshot.ports,'8097/tcp':[{HostIp:'0.0.0.0',HostPort:'8097'}]}},{...snapshot,ports:{...snapshot.ports,'80/tcp':[{HostIp:'127.0.0.1',HostPort:'8080'}]}},{...snapshot,publishAll:true}])assert.equal(compareContainer(changed,mounts,ports).portsOk,false)});
test('fallos del demonio bloquean la comprobación y no filtran rutas privadas',()=>{const result=inspectContainers({dockerHost:'ssh://nas',appName:'app',browserName:'browser',appMounts:mounts,appPorts:ports,browserMounts:[],browserPorts:[]},()=>{throw Error('/private/key secret')});assert.equal(result.inspection_ok,'false');assert.doesNotMatch(JSON.stringify(result),/private|secret/)});
test('un despliegue nuevo puede planearse con contenedores todavía ausentes',()=>{const result=inspectContainers({dockerHost:'ssh://nas',appName:'app',browserName:'browser',appMounts:mounts,appPorts:ports,browserMounts:[],browserPorts:[]},()=> '');assert.equal(result.inspection_ok,'true');assert.equal(result.app_exists,'false');assert.equal(result.browser_exists,'false')});
test('ignora el orden de las propiedades en el JSON generado por OpenTofu',()=>{
 const shuffledMounts=mounts.map(m=>({readOnly:m.readOnly,source:m.source,target:m.target,type:m.type}));
 const shuffledPorts=ports.map(p=>({external:p.external,internal:p.internal,ip:p.ip}));
 assert.deepEqual(compareContainer(snapshot,shuffledMounts,shuffledPorts),{mountsOk:true,portsOk:true});
});
test('una inspección incompleta no puede pasar como configuración válida',()=>{
 assert.throws(()=>compareContainer({...snapshot,mounts:[{Type:'volume',Name:'project_data',Destination:'/data'},snapshot.mounts[1]]},mounts,ports));
 assert.throws(()=>compareContainer({...snapshot,ports:undefined},mounts,ports));
});
