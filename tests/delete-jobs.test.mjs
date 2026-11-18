import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:net';
import {DatabaseSync} from 'node:sqlite';

async function freePort(){const s=createServer();await new Promise(r=>s.listen(0,'127.0.0.1',r));const p=s.address().port;await new Promise(r=>s.close(r));return p}

test('el historial elimina solo la búsqueda seleccionada, con autorización y sin borrar las activas', async t=>{
  const data=await mkdtemp(join(tmpdir(),'radar-delete-test-'));
  const port=await freePort(), control=await freePort();
  const child=spawn(process.execPath,['--disable-warning=ExperimentalWarning','--experimental-sqlite','server/server.mjs'],{env:{...process.env,RADAR_DATA:data,PORT:String(port),CONTROL_PORT:String(control),OPENCODE_API_KEY:''},stdio:'ignore'});
  t.after(async()=>{child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));await rm(data,{recursive:true,force:true})});
  const base=`http://127.0.0.1:${control}`;
  for(let i=0;i<100;i++){try{if((await fetch(base+'/api/status')).ok)break}catch{}await new Promise(r=>setTimeout(r,50))}
  const setup=await fetch(base+'/api/setup',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:'temporary-test-password'})});
  assert.equal(setup.status,200);
  const cookie=setup.headers.get('set-cookie').split(';')[0];
  const db=new DatabaseSync(join(data,'radar.sqlite'));
  const add=db.prepare('INSERT INTO jobs(id,prompt,status,created,updated) VALUES(?,?,?,?,?)');
  for(const [id,status] of [['aaa','completada'],['bbb','ejecutando'],['ccc','completada']])add.run(id,'Búsqueda de prueba',status,'2026-01-01','2026-01-01');
  assert.equal((await fetch(base+'/api/jobs/aaa',{method:'DELETE'})).status,401);
  assert.equal((await fetch(base+'/api/jobs/aaa',{method:'DELETE',headers:{cookie,origin:'https://evil.invalid'}})).status,403);
  assert.equal((await fetch(base+'/api/jobs/bbb',{method:'DELETE',headers:{cookie}})).status,409);
  assert.equal((await fetch(base+'/api/jobs/aaa',{method:'DELETE',headers:{cookie}})).status,200);
  assert.equal((await fetch(base+'/api/jobs/aaa',{method:'DELETE',headers:{cookie}})).status,404);
  assert.deepEqual(db.prepare('SELECT id FROM jobs ORDER BY id').all().map(x=>x.id),['bbb','ccc']);
  db.close();
});
