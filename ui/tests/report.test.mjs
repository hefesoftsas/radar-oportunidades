import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {renderReport,extractHighlights} from '../src/report.js';

function render(text) {
  const dom = new JSDOM('<main id="report"></main>', {url:'https://radar.test/'});
  const root = dom.window.document.querySelector('#report');
  renderReport(root, text);
  return root;
}

test('presenta títulos, énfasis, listas, enlaces y tablas Markdown', () => {
  const root = render('## Comparación\n\nUna **oportunidad**.\n\n- Primera\n- Segunda\n\n| Barrio | Precio |\n|---|---|\n| Bosa | $130.000.000 |\n\nhttps://example.com/anuncio');
  assert.equal(root.querySelector('h2')?.textContent, 'Comparación');
  assert.equal(root.querySelector('strong')?.textContent, 'oportunidad');
  assert.equal(root.querySelectorAll('ul li').length, 2);
  assert.equal(root.querySelector('table td:nth-child(2)')?.textContent, '$130.000.000');
  assert.ok(root.querySelector('.report-table-scroll table'));
  const link = root.querySelector('a');
  assert.equal(link?.href, 'https://example.com/anuncio');
  assert.equal(link?.target, '_blank');
  assert.match(link?.rel, /noopener/);
});

test('descarta contenido y enlaces peligrosos del informe', () => {
  const root = render('<img src=x onerror="alert(1)">\n\n<script>alert(2)</script>\n\n[Enlace](javascript:alert(3))\n\n[Seguro](https://example.com)');
  assert.equal(root.querySelector('img,script,[onerror]'), null);
  assert.equal(root.querySelector('a[href^="javascript:"]'), null);
  assert.equal(root.querySelector('a[href="https://example.com"]')?.textContent, 'Seguro');
});

test('reemplaza el contenido anterior al abrir otro informe', () => {
  const root = render('## Informe anterior');
  renderReport(root, '### Informe nuevo');
  assert.equal(root.querySelector('h2'), null);
  assert.equal(root.querySelector('h3')?.textContent, 'Informe nuevo');
});

test('extrae solo enlaces individuales de Marketplace asociados a un candidato', async () => {
  const {extractHighlights}=await import('../src/report.js');
  const root=render('## Candidatos\n\n### 1. Apartamento en Soacha — $120.000.000\n\n- Enlace: https://www.facebook.com/marketplace/item/123456/\n- Detalles: 2 habitaciones\n\n### Comparación\n\n[Fuente](https://example.com)');
  const result=extractHighlights(root);
  assert.equal(result.length,1);assert.match(result[0].title,/Soacha/);assert.equal(result[0].url,'https://www.facebook.com/marketplace/item/123456/');
});

test('destaca enlaces de publicaciones y catálogo de Mercado Libre sin incluir búsquedas', async () => {
 const {extractHighlights}=await import('../src/report.js');
 const root=render('### Mac mini\n\nhttps://articulo.mercadolibre.com.co/MCO-12345678-mac-mini-_JM\n\n### Catálogo\n\nhttps://www.mercadolibre.com.co/mac-mini/p/MCO123456\n\n### Búsqueda\n\nhttps://listado.mercadolibre.com.co/mac-mini');
 const links=extractHighlights(root);assert.equal(links.length,2);assert.equal(links[0].source,'Mercado Libre');assert.equal(links[1].source,'Mercado Libre');
});

test('encuentra todos los enlaces de listas y tablas sin depender de subtítulos', () => {
 const list=Array.from({length:7},(_,i)=>`- Mac mini ${i}: https://www.facebook.com/marketplace/item/${100000+i}/`).join('\n');
 const root=render(`## Resultados\n\n${list}\n\n| Producto | Enlace |\n|---|---|\n| Mac mini M2 | https://www.mercadolibre.com.co/modelo/p/MCO123456 |\n| Apartamento | https://www.fincaraiz.com.co/apartamento-en-venta-en-bogota/193481394 |\n\nhttps://www.facebook.com/marketplace/search/?query=mac\n\nhttps://www.facebook.com.evil.test/marketplace/item/111111/`);
 const links=extractHighlights(root);assert.equal(links.length,9);assert.match(links[0].title,/Mac mini 0/);assert.match(links[7].title,/Mac mini M2/);assert.equal(links[8].source,'Finca Raíz');
});

test('convierte identificadores en enlaces solo si hay una dirección respaldada', () => {
 const dom=new JSDOM('<main></main>',{url:'https://radar.test/'}),root=dom.window.document.querySelector('main');
 renderReport(root,'## Mejores opciones\n\n- Primera: item 123456.\n- Segunda: item 789012.\n- Tercera: item 999999.\n\nFuente: https://www.facebook.com/marketplace/item/123456/',[
   {text:'Revisando Marketplace: https://www.facebook.com/marketplace/item/789012/'},
   {text:'Revisando Marketplace: https://facebook.com.evil.test/marketplace/item/999999/'}
 ]);
 const links=[...root.querySelectorAll('a')];assert.ok(links.some(a=>a.textContent==='item 123456'&&a.href==='https://www.facebook.com/marketplace/item/123456/'));assert.ok(links.some(a=>a.textContent==='item 789012'&&a.href==='https://www.facebook.com/marketplace/item/789012/'));assert.ok(!links.some(a=>a.textContent==='item 999999'));assert.match(root.textContent,/item 999999 \(enlace no disponible\)/);
});

test('completa rutas de catálogo de Mercado Libre sin modificar enlaces de otros sitios', () => {
 const root=render('## Mercado Libre\n\nCatálogo /p/MCO123456 y [otro catálogo](/p/MCO987654).\n\n[Otro sitio](https://example.com/p/MCO543210)');
 const links=[...root.querySelectorAll('a')];assert.ok(links.some(a=>a.href==='https://www.mercadolibre.com.co/p/MCO123456'));assert.ok(links.some(a=>a.href==='https://www.mercadolibre.com.co/p/MCO987654'));assert.ok(links.some(a=>a.href==='https://example.com/p/MCO543210'));
});
