import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

test('Coolify usa red interna, volúmenes persistentes y credencial de solo lectura',()=>{
 const env={...process.env,RADAR_KEY_PATH:'/example/private-key',RADAR_DATA_VOLUME:'radar-test-data',RADAR_FACEBOOK_VOLUME:'radar-test-profile'};
 const result=spawnSync('docker',['compose','-f','compose.coolify.yaml','config','--format','json'],{encoding:'utf8',env});
 assert.equal(result.status,0,result.stderr);const c=JSON.parse(result.stdout);
 assert.equal(c.services.radar.ports,undefined);assert.equal(c.services['facebook-browser'].ports,undefined);
 assert.equal(c.services.radar.container_name,undefined);assert.equal(c.services['facebook-browser'].container_name,undefined);
 assert.equal(c.volumes['radar-data'].external,true);assert.equal(c.volumes['facebook-profile'].external,true);
 const credential=c.services.radar.volumes.find(v=>v.target==='/run/secrets/opencode_key');assert.equal(credential.type,'bind');assert.equal(credential.read_only,true);
 assert.ok(c.services.radar.healthcheck);
});
