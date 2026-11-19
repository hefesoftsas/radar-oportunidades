import * as cheerio from 'cheerio';

const host = 'listado.mercadolibre.com.co';
const allowedHost = value => value === 'mercadolibre.com.co' || value.endsWith('.mercadolibre.com.co');
export function validateMercadoLibrePage(url) {
  const parsed=new URL(url);
  if(parsed.protocol!=='https:'||!allowedHost(parsed.hostname)||parsed.username||parsed.password||parsed.port)throw Error('Redirección fuera de Mercado Libre.');
  if(/\/(?:gz\/account-verification|login|jms\/mco\/lgz)(?:\/|$)/i.test(parsed.pathname)) {
    const error=Error('Mercado Libre solicita iniciar sesión o verificar la cuenta. Conecta Mercado Libre en Radar y completa la verificación allí.');
    error.code='MELI_AUTH_REQUIRED';throw error;
  }
  return parsed;
}
export function buildMercadoLibreSearchUrl(query, page=1) {
  const value=String(query||'').trim();
  if(value.length<2 || value.length>160) throw Error('Indica un término de búsqueda de 2 a 160 caracteres.');
  if(!Number.isInteger(page)||page<1||page>5) throw Error('Número de páginas inválido.');
  const slug=value.toLocaleLowerCase('es-CO').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-+|-+$/g,'');
  if(!slug) throw Error('Indica un término de búsqueda válido.');
  return `https://${host}/${encodeURIComponent(slug)}${page>1?`_Desde_${(page-1)*50+1}`:''}`;
}
function normalizeListingUrl(raw) {
  try {
    const url=new URL(raw);
    if(url.protocol!=='https:'||!allowedHost(url.hostname)||url.username||url.password||url.port) return null;
    if(!(/\/MCO-?\d+/i.test(url.pathname)||/\/p\/MCO\d+/i.test(url.pathname))) return null;
    url.hash='';url.search='';
    return url.href;
  } catch {return null;}
}
export function extractMercadoLibreListings(html) {
  const $=cheerio.load(html),results=[];
  $('.ui-search-layout__item').each((_,card)=>{
    const link=$(card).find('a.poly-component__title, a.ui-search-link').first(),url=normalizeListingUrl(link.attr('href'));
    const titulo=link.text().replace(/\s+/g,' ').trim();if(!url||!titulo)return;
    const fraction=$(card).find('.poly-price__current .andes-money-amount__fraction, .ui-search-price__second-line .andes-money-amount__fraction').first().text();
    const digits=fraction.replace(/\D/g,''),price=digits?Number(digits):null;
    results.push({titulo,url,precio:Number.isSafeInteger(price)?price:null,moneda:'COP',tipo:/\/p\/MCO\d+/i.test(new URL(url).pathname)?'catalogo':'publicacion'});
  });
  return results;
}
async function getPage(url,{fetcher,signal}) {
  let current=url;
  for(let i=0;i<4;i++){
    validateMercadoLibrePage(current);
    const signals=[AbortSignal.timeout(20000)];if(signal)signals.push(signal);
    const r=await fetcher(current,{signal:AbortSignal.any(signals),redirect:'manual',headers:{'user-agent':'Mozilla/5.0','accept':'text/html'}});
    if(r.status>=300&&r.status<400){const location=r.headers.get('location');if(!location)throw Error('Redirección inválida.');current=new URL(location,current).href;continue;}
    if(!r.ok){const e=Error(`Mercado Libre no permitió consultar la página (${r.status}).`);if([401,403].includes(r.status))e.code='MELI_AUTH_REQUIRED';throw e;}
    if(!(r.headers.get('content-type')||'').includes('text/html'))throw Error('Mercado Libre devolvió un formato inesperado.');
    const html=await r.text();if(html.length>5000000)throw Error('La página de Mercado Libre es demasiado grande.');
    return {html,url:current};
  }
  throw Error('Demasiadas redirecciones en Mercado Libre.');
}
export async function searchMercadoLibre({query,pages=3,signal,onProgress=()=>{},fetcher=fetch,browserFetcher}) {
  const total=Math.max(1,Math.min(5,Math.floor(Number(pages)||3))),results=[],seen=new Set(),visited=new Set();let paginas=0,motivo='limite_paginas',error=null;
  for(let page=1;page<=total;page++){
    signal?.throwIfAborted();const url=buildMercadoLibreSearchUrl(query,page);let html;
    try{
      try{html=await getPage(url,{fetcher,signal})}
      catch(e){if(e.code!=='MELI_AUTH_REQUIRED'||!browserFetcher)throw e;html=await browserFetcher(url,{signal});validateMercadoLibrePage(html.url)}
    }catch(e){if(signal?.aborted)throw e;if(!paginas)throw e;motivo='error_pagina';error=String(e.message).slice(0,200);break;}
    if(visited.has(html.url)){motivo='paginacion_no_disponible';break;}visited.add(html.url);
    const rows=extractMercadoLibreListings(html.html);paginas++;let added=0;
    for(const row of rows){if(!seen.has(row.url)){seen.add(row.url);results.push(row);added++;}}
    onProgress({pagina:page,publicaciones:results.length});
    if(!rows.length){motivo='sin_resultados_identificables';break;}
    if(!added){motivo='sin_resultados_nuevos';break;}
  }
  return {consulta:query,paginas_leidas:paginas,motivo_parada:motivo,...(error?{error}:{}),publicaciones:results,advertencia:'Resultados públicos de listados, sin apertura individual; los enlaces de catálogo pueden agrupar ofertas. Los precios, ubicación, estado y disponibilidad deben verificarse. La consulta no aplica filtros exactos de ubicación ni precio.'};
}
