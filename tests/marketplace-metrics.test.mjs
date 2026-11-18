import test from 'node:test';
import assert from 'node:assert/strict';
import {marketplaceCoverage} from '../server/marketplace-coverage.mjs';

test('cuenta búsquedas, anuncios únicos y anuncios abiertos sin duplicar',()=>{
 const c=marketplaceCoverage();c.attempt();c.search({desplazamientos:12,motivo_parada:'sin_resultados_nuevos',publicaciones:[{url:'a'},{url:'b'}]});c.attempt();c.search({desplazamientos:20,motivo_parada:'limite_desplazamientos',publicaciones:[{url:'b'},{url:'c'}]});c.attempt();c.open('b');c.open('b');
 const text=c.summary();assert.match(text,/2 de 3/);assert.match(text,/32 desplazamientos/);assert.match(text,/3 anuncios únicos/);assert.match(text,/1 anuncio abierto/);assert.match(text,/sin resultados nuevos/);assert.match(text,/límite de desplazamientos/);
});
