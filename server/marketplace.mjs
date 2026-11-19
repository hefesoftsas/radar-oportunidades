import {chromium} from 'playwright-core';
import {lookup} from 'node:dns/promises';
import {collectMarketplaceListings,marketplaceScanLimit} from './marketplace-collector.mjs';
import {buildMarketplaceSearchUrl,validateItemUrl,parseListingText,browserCdpAddress,facebookSessionStatus,mercadoLibreSessionStatus} from './marketplace-utils.mjs';
import {withAgent} from './browser-lock.mjs';
import {focusBrowserSource,fetchMercadoLibrePage} from './browser-sources.mjs';
let browser, connecting;
async function browserContext(){
  if(!browser||!browser.isConnected()){
    if(!connecting) connecting=(async()=>chromium.connectOverCDP(await browserCdpAddress(process.env.BROWSER_CDP||'http://facebook-browser:9223',lookup),{timeout:12000}))();
    try{browser=await connecting}finally{connecting=null}
  }
  const context=browser.contexts()[0];
  if(!context)throw Error('El navegador aún no está listo.');
  return context;
}
export async function getFacebookStatus(){
  try{return {available:true,...facebookSessionStatus(await (await browserContext()).cookies('https://www.facebook.com'))}}
  catch{return {available:false,savedSession:false}}
}
export async function getMercadoLibreStatus(){
  try{return {available:true,...mercadoLibreSessionStatus(await (await browserContext()).cookies('https://www.mercadolibre.com.co'))}}
  catch{return {available:false,savedSession:false}}
}
async function pageSession(fn){return withAgent(async()=>{let page;try{const context=await browserContext();page=await context.newPage();page.setDefaultTimeout(12000);return await fn(page);}catch(e){if(/ECONNREFUSED|connectOverCDP|ENOTFOUND|Target closed/i.test(e.message))throw Error('El navegador del NAS no está disponible.');throw e;}finally{if(page)await page.close().catch(()=>{})}})}
export async function openBrowserSource(source){try{return await withAgent(async()=>focusBrowserSource(await browserContext(),source))}catch(e){if(/ECONNREFUSED|connectOverCDP|ENOTFOUND|Target closed/i.test(e.message))throw Error('No se pudo abrir el navegador. Inténtalo de nuevo en unos segundos.');throw e}}
export async function searchMercadoLibreWithBrowser(url,options){return pageSession(page=>fetchMercadoLibrePage(page,url,options))}
async function checkLogin(page){const u=page.url();if(/\/login|\/checkpoint/i.test(u)||await page.locator('input[type="password"]').count())throw Error('Facebook solicita iniciar sesión o verificar la cuenta. Abre la conexión protegida y complétalo personalmente.');}
export async function searchMarketplace({query,location='',min,max,pages=45,signal,onProgress=()=>{}}){
  const url=buildMarketplaceSearchUrl({query,location,min,max});
  // A model-specified small value must not silently limit an exhaustive search.
  const maxScans=marketplaceScanLimit(pages);
  return pageSession(async page=>{
    signal?.throwIfAborted();
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForTimeout(2000);
    await checkLogin(page);
    const ubicacion=await page.getByRole('button',{name:/^(Location:|Ubicación:)/i}).first().innerText({timeout:1500}).catch(()=>null);
    const result=await collectMarketplaceListings({
      maxScans,maxResults:150,signal,onProgress,
      check:()=>checkLogin(page),
      readRows:()=>page.locator('a[href*="/marketplace/item/"]').evaluateAll(es=>es.map(e=>({url:e.href,text:(e.innerText||e.getAttribute('aria-label')||'').replace(/\s+/g,' ').trim()}))),
      advance:async()=>{const amount=await page.evaluate(()=>Math.max(400,Math.round(window.innerHeight*.8)));await page.mouse.wheel(0,amount);await page.waitForTimeout(1600);return page.evaluate(()=>({atBottom:window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-120}))},
    });
    return {consulta:query,ubicacion_solicitada:location,ubicacion_facebook:ubicacion||'No se pudo comprobar la ubicación y el radio; revísalos en Facebook.',url,...result,publicaciones_encontradas:result.publicaciones.length,advertencia:'Los resultados son anuncios de terceros. La ciudad solicitada se añade como texto de búsqueda, no cambia el filtro geográfico. Los resúmenes no sustituyen la lectura individual. Verifica ubicación, precio y disponibilidad.'};
  });
}
export async function readMarketplace(input){const url=validateItemUrl(input);return pageSession(async page=>{await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForTimeout(2000);await checkLogin(page);let title=await page.locator('h1').first().innerText().catch(()=>null);let body=await page.locator('body').innerText({timeout:10000});let description=parseListingText(body);if(!title&&!description)throw Error('No fue posible leer esta publicación; puede estar retirada o requerir verificación.');return {url,titulo:title,descripcion:description||'Descripción no disponible',advertencia:'Datos del anuncio sin validar con el vendedor.'};});}
