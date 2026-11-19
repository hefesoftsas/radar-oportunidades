import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:net';

async function freePort(){const s=createServer();await new Promise(r=>s.listen(0,'127.0.0.1',r));const p=s.address().port;await new Promise(r=>s.close(r));return p}
test('la apertura del navegador exige sesión y limita las fuentes',async t=>{
  const data=await mkdtemp(join(tmpdir(),'radar-source-api-')),port=await freePort(),control=await freePort();
  const child=spawn(process.execPath,['--experimental-sqlite','server/server.mjs'],{env:{...process.env,RADAR_DATA:data,PORT:String(port),CONTROL_PORT:String(control),RADAR_BASIC_USER:'',BROWSER_CDP:'http://browser.invalid:9223'},stdio:'ignore'});
  t.after(async()=>{if(child.exitCode===null){child.kill('SIGTERM');await new Promise(r=>child.once('exit',r))}await rm(data,{recursive:true,force:true})});
  const base=`http://127.0.0.1:${control}`;for(let i=0;i<100;i++){try{if((await fetch(base+'/api/status')).ok)break}catch{}await new Promise(r=>setTimeout(r,50))}
  const post=(body,headers={})=>fetch(base+'/api/browser/open',{method:'POST',headers:{'content-type':'application/json',...headers},body:JSON.stringify(body)});
  assert.equal((await post({source:'mercadolibre'})).status,401);
  const setup=await fetch(base+'/api/setup',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:'temporary-test-password'})});
  const cookie=setup.headers.get('set-cookie').split(';')[0];
  assert.equal((await post({source:'https://example.org'},{cookie})).status,400);
  assert.equal((await post({source:'mercadolibre'},{cookie,origin:'https://evil.invalid'})).status,403);
  const unavailable=await post({source:'mercadolibre'},{cookie});assert.equal(unavailable.status,503);assert.match((await unavailable.json()).error,/No se pudo abrir el navegador/);
});
