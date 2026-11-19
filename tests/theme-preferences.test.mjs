import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:net';
async function freePort(){const s=createServer();await new Promise(r=>s.listen(0,'127.0.0.1',r));const p=s.address().port;await new Promise(r=>s.close(r));return p}
test('la preferencia de tema requiere sesión y persiste en el servidor',async t=>{
 const data=await mkdtemp(join(tmpdir(),'radar-theme-test-')),port=await freePort(),control=await freePort();
 const start=()=>spawn(process.execPath,['--disable-warning=ExperimentalWarning','--experimental-sqlite','server/server.mjs'],{env:{...process.env,RADAR_DATA:data,PORT:String(port),CONTROL_PORT:String(control),OPENCODE_API_KEY:''},stdio:'ignore'});let child=start();
 t.after(async()=>{if(child.exitCode===null){child.kill('SIGTERM');await new Promise(r=>child.once('exit',r))}await rm(data,{recursive:true,force:true})});
 const base=`http://127.0.0.1:${control}`;
 const ready=async()=>{for(let i=0;i<100;i++){try{if((await fetch(base+'/api/status')).ok)return}catch{}await new Promise(r=>setTimeout(r,50))}throw Error('El servidor no arrancó')};await ready();
 assert.equal((await fetch(base+'/api/preferences')).status,401);
 const setup=await fetch(base+'/api/setup',{method:'POST',headers:{'content-type':'application/json','x-forwarded-proto':'https'},body:JSON.stringify({password:'temporary-test-password'})});assert.equal(setup.status,200);
 assert.match(setup.headers.get('set-cookie'),/; Secure(?:;|$)/i);
 const cookie=setup.headers.get('set-cookie').split(';')[0];
 let get=await fetch(base+'/api/preferences',{headers:{cookie}});assert.equal(get.status,200);assert.equal((await get.json()).theme,null);
 const update=(theme,origin=base)=>fetch(base+'/api/preferences',{method:'PUT',headers:{cookie,origin,'content-type':'application/json'},body:JSON.stringify({theme})});
 assert.equal((await update('dark','https://example.invalid')).status,403);
 assert.equal((await update('incorrecto')).status,400);
 assert.equal((await update('dark')).status,200);
 get=await fetch(base+'/api/preferences',{headers:{cookie}});assert.equal((await get.json()).theme,'dark');
 child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));child=start();await ready();
 get=await fetch(base+'/api/preferences',{headers:{cookie}});assert.equal((await get.json()).theme,'dark');
 assert.equal((await update('light')).status,200);
 get=await fetch(base+'/api/preferences',{headers:{cookie}});assert.equal((await get.json()).theme,'light');
});
