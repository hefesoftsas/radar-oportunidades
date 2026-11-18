import assert from 'node:assert/strict';import {beginRemote,endRemote,beginAgent,endAgent,browserState} from '../server/browser-lock.mjs';
assert.equal(beginRemote(),true);assert.throws(()=>beginAgent(),/ventana/);endRemote();beginAgent();assert.equal(beginRemote(),false);assert.equal(browserState().agentBusy,true);endAgent();assert.equal(beginRemote(),true);endRemote();console.log('Acceso al navegador: exclusión mutua correcta');
const {withAgent}=await import('../server/browser-lock.mjs');
let active=0,peak=0,sequence=[];
await Promise.all([1,2,3].map(i=>withAgent(async()=>{active++;peak=Math.max(peak,active);await new Promise(r=>setTimeout(r,5));sequence.push(i);active--;})));
assert.equal(peak,1);assert.deepEqual(sequence,[1,2,3]);
