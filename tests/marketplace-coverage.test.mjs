import test from 'node:test';
import assert from 'node:assert/strict';
import {collectMarketplaceListings} from '../server/marketplace-collector.mjs';
const row=(id,text='Apartamento $130.000.000')=>({url:`https://www.facebook.com/marketplace/item/${id}/?ref=search`,text});

test('continúa a través de muchos desplazamientos y deduplica anuncios',async()=>{
 let page=0,scrolls=0;
 const result=await collectMarketplaceListings({maxScans:25,maxResults:200,readRows:async()=>[row(page+1),row(1)],advance:async()=>{page++;scrolls++},check:async()=>{}});
 assert.equal(result.publicaciones.length,25);assert.equal(result.desplazamientos,24);assert.equal(result.motivo_parada,'limite_desplazamientos');assert.equal(scrolls,24);
});
test('termina después de varios intentos sin nuevos resultados, sin fingir que hizo el máximo',async()=>{
 let scrolls=0;const r=await collectMarketplaceListings({maxScans:30,maxResults:200,noNewLimit:4,readRows:async()=>[row(123)],advance:async()=>{scrolls++},check:async()=>{}});
 assert.equal(r.publicaciones.length,1);assert.equal(r.pasadas,5);assert.equal(r.desplazamientos,4);assert.equal(r.motivo_parada,'sin_resultados_nuevos');assert.equal(scrolls,4);
});
test('limita el volumen, descarta enlaces ajenos y permite cancelar',async()=>{
 const r=await collectMarketplaceListings({maxScans:30,maxResults:2,readRows:async()=>[row(1),{url:'https://evil.example/',text:'test'},row(2),row(3)],advance:async()=>{},check:async()=>{}});
 assert.equal(r.publicaciones.length,2);assert.equal(r.motivo_parada,'limite_resultados');
 const controller=new AbortController();controller.abort();
 await assert.rejects(collectMarketplaceListings({maxScans:30,maxResults:200,signal:controller.signal,readRows:async()=>[],advance:async()=>{},check:async()=>{}}));
});
test('no detiene el recorrido si aún no llegó al final de la lista cargada',async()=>{
 let scroll=0;
 const r=await collectMarketplaceListings({maxScans:20,maxResults:200,noNewLimit:4,readRows:async()=>scroll<8?[row(1)]:[row(1),row(2)],advance:async()=>({atBottom:++scroll>=9}),check:async()=>{}});
 assert.equal(r.publicaciones.length,2);assert.ok(r.desplazamientos>=9);assert.equal(r.motivo_parada,'sin_resultados_nuevos');
});
test('las consultas usan una profundidad amplia aunque el agente pida pocas pasadas',async()=>{
 const {marketplaceScanLimit}=await import('../server/marketplace-collector.mjs');
 assert.equal(marketplaceScanLimit(3),30);assert.equal(marketplaceScanLimit(undefined),45);assert.equal(marketplaceScanLimit(500),80);
});
