import { validateMercadoLibrePage } from './mercadolibre.mjs';

const sources={
  facebook:{url:'https://m.facebook.com/marketplace/',matches:host=>host==='facebook.com'||host.endsWith('.facebook.com')},
  mercadolibre:{url:'https://listado.mercadolibre.com.co/celulares',matches:host=>host==='mercadolibre.com.co'||host.endsWith('.mercadolibre.com.co')},
};

export async function focusBrowserSource(context,source){
  const site=sources[source];if(!site)throw Error('Fuente de navegador no reconocida.');
  let page=context.pages().find(p=>{try{return site.matches(new URL(p.url()).hostname)}catch{return false}});
  if(!page){page=await context.newPage();await page.goto(site.url,{waitUntil:'domcontentloaded',timeout:12000});}
  await page.bringToFront();
}

export async function fetchMercadoLibrePage(page,url,{signal}={}){
  validateMercadoLibrePage(url);signal?.throwIfAborted();
  const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});signal?.throwIfAborted();
  const finalUrl=page.url();validateMercadoLibrePage(finalUrl);
  if(response&&response.status()>=400)throw Error(`Mercado Libre no permitió consultar la página (${response.status()}). Revisa la conexión con tu cuenta.`);
  const html=await page.content();if(html.length>5000000)throw Error('La página de Mercado Libre es demasiado grande.');
  return {url:finalUrl,html};
}
