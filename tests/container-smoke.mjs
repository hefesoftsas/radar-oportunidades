import assert from 'node:assert/strict';
import WebSocket from 'ws';
const base='http://127.0.0.1:18968';
let denied=await fetch(`${base}/browser/vnc.html`);assert.equal(denied.status,401);
let setup=await fetch(`${base}/api/setup`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:'temporary-smoke-test-only'})});assert.equal(setup.status,200);
let cookie=setup.headers.get('set-cookie').split(';')[0];
let response=await fetch(`${base}/browser/vnc.html`,{headers:{cookie}});assert.equal(response.status,200);assert.match(await response.text(),/noVNC/i);
await new Promise((resolve,reject)=>{const ws=new WebSocket('ws://127.0.0.1:18968/browser/websockify',{headers:{cookie,origin:base}});let timer=setTimeout(()=>{ws.terminate();reject(Error('No se recibió el saludo VNC'))},15000);ws.on('message',data=>{try{assert.match(data.toString(),/^RFB /);clearTimeout(timer);ws.close();resolve()}catch(e){clearTimeout(timer);ws.terminate();reject(e)}});ws.on('error',e=>{clearTimeout(timer);reject(e)});});
console.log('Autenticación, noVNC y conexión al navegador comprobadas.');
