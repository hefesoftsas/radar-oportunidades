import test from 'node:test';
import assert from 'node:assert/strict';
import { focusBrowserSource, fetchMercadoLibrePage } from '../server/browser-sources.mjs';

test('abre la fuente solicitada sin reemplazar la pestaña de Facebook', async () => {
  const actions=[];
  const facebook={url:()=> 'https://www.facebook.com/marketplace/',bringToFront:async()=>actions.push('facebook')};
  const mercado={url:()=> 'about:blank',goto:async url=>actions.push(url),bringToFront:async()=>actions.push('mercado')};
  const context={pages:()=>[facebook],newPage:async()=>mercado};
  await focusBrowserSource(context,'mercadolibre');
  assert.match(actions[0],/^https:\/\/listado\.mercadolibre\.com\.co\//);
  assert.equal(actions[1],'mercado');
  await focusBrowserSource(context,'facebook');assert.equal(actions.at(-1),'facebook');
  await assert.rejects(focusBrowserSource(context,'desconocido'),/fuente/i);
});

test('solo devuelve páginas permitidas y reconoce la verificación de Mercado Libre', async () => {
  let current='https://listado.mercadolibre.com.co/mac-mini';
  const page={goto:async()=>{},url:()=>current,content:async()=>'<html>resultados</html>'};
  assert.deepEqual(await fetchMercadoLibrePage(page,current),{url:current,html:'<html>resultados</html>'});
  current='https://www.mercadolibre.com.co/gz/account-verification';
  await assert.rejects(fetchMercadoLibrePage(page,'https://listado.mercadolibre.com.co/mac-mini'),/verific/i);
  await assert.rejects(fetchMercadoLibrePage(page,'https://evil.example/'),/fuera/i);
  current='https://listado.mercadolibre.com.co/mac-mini';page.goto=async()=>({status:()=>403});
  await assert.rejects(fetchMercadoLibrePage(page,current),/403/);
});
