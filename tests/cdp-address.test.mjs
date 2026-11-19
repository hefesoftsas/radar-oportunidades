import test from 'node:test';
import assert from 'node:assert/strict';
import {browserCdpAddress, facebookSessionStatus, mercadoLibreSessionStatus} from '../server/marketplace-utils.mjs';

test('resuelve el nombre del navegador del NAS a una dirección aceptada por Chromium', async () => {
  assert.equal(await browserCdpAddress('http://facebook-browser:9223', async host => {
    assert.equal(host, 'facebook-browser');
    return {address:'172.20.0.3'};
  }), 'http://172.20.0.3:9223/');
  assert.equal(await browserCdpAddress('http://127.0.0.1:9223', () => {throw Error('no resolver');}), 'http://127.0.0.1:9223');
});

test('reconoce indicios de sesión de Mercado Libre sin devolver datos de cookies', () => {
  assert.deepEqual(mercadoLibreSessionStatus([{name:'ssid',value:'secret'},{name:'orguserid',value:'secret'}]),{savedSession:true});
  assert.deepEqual(mercadoLibreSessionStatus([{name:'ssid',value:'secret'}]),{savedSession:false});
  assert.deepEqual(mercadoLibreSessionStatus([{name:'ssid',value:''},{name:'orguserid',value:'secret'}]),{savedSession:false});
});

test('distingue sesión guardada de ausencia de sesión sin revelar las cookies', () => {
  assert.deepEqual(facebookSessionStatus([{name:'c_user',value:'private'},{name:'xs',value:'private'}]), {savedSession:true});
  assert.deepEqual(facebookSessionStatus([{name:'c_user',value:'private'}]), {savedSession:false});
});
