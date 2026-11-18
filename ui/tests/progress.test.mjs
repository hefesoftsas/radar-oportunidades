import test from 'node:test';
import assert from 'node:assert/strict';
import {deriveProgress,formatDuration} from '../src/progress.js';
const created='2026-11-16T20:00:00.000Z';
const e=(text,at='2026-11-16T20:01:00.000Z')=>({text,at});
test('muestra solo los datos observados del recorrido en curso',()=>{
 const job={status:'ejecutando',created,progress:[e('Buscando en Marketplace: mac mini'),e('Buscando en Marketplace: mac mini m1'),e('Marketplace: 150 anuncios encontrados; 35 desplazamientos.'),e('Marketplace: 49 anuncios encontrados en 5 pasadas.')]};
 const p=deriveProgress(job,Date.parse('2026-11-16T20:02:30.000Z'));
 assert.equal(p.active,true);assert.equal(p.phase,'Recorriendo Marketplace');assert.equal(p.elapsed,'2 min 30 s');assert.equal(p.found,49);assert.equal(p.passes,5);assert.equal(p.batchLabel,'Recorrido en curso');assert.equal(p.readRequests,0);
});
test('distingue las solicitudes de lectura de anuncios abiertos',()=>{
 const p=deriveProgress({status:'ejecutando',created,progress:[e('Marketplace: 100 anuncios encontrados; 28 desplazamientos.'),e('Revisando Marketplace: https://www.facebook.com/marketplace/item/123/'),e('Revisando Marketplace: https://www.facebook.com/marketplace/item/456/')]},Date.parse(created));
 assert.equal(p.phase,'Revisiones solicitadas');assert.equal(p.readRequests,2);assert.equal(p.batchLabel,'Último recorrido completado');assert.equal(p.found,100);assert.equal(p.scrolls,28);
});
test('trata de forma distinta cola, fin y error, sin inventar contadores',()=>{
 const queued=deriveProgress({status:'en cola',created,progress:[]},Date.parse(created));assert.equal(queued.phase,'En espera');assert.equal(queued.found,null);assert.equal(queued.active,true);
 for(const status of ['completada','cancelada','error','interrumpida'])assert.equal(deriveProgress({status,created,progress:[]},Date.parse(created)).active,false);
 assert.equal(formatDuration(65000),'1 min 05 s');assert.equal(formatDuration(3700000),'1 h 01 min');assert.equal(formatDuration(-10),'0 s');
});
test('no presenta un recorrido anterior como el recorrido actual',()=>{
 const p=deriveProgress({status:'ejecutando',created,progress:[e('Marketplace: 49 anuncios encontrados en 5 pasadas.'),e('Buscando en Marketplace: mac mini m2')]});
 assert.equal(p.batchLabel,'Último recorrido registrado');assert.equal(p.queryRequests,1);assert.equal(p.phase,'Consultas solicitadas');
});
