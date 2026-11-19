export function buildMarketplaceSearchUrl({query,location='',min,max}){let q=String(query||'').trim();if(q.length<2||q.length>200)throw Error('Indica un término de búsqueda de 2 a 200 caracteres.');let place=String(location||'').trim().slice(0,100);for(let n of [min,max])if(n!==undefined&&n!==null&&n!==''&&(!Number.isSafeInteger(Number(n))||Number(n)<0))throw Error('Precio inválido.');if(min!==undefined&&max!==undefined&&min!==''&&max!==''&&Number(min)>Number(max))throw Error('El precio mínimo supera el máximo.');const u=new URL('https://www.facebook.com/marketplace/search/');u.searchParams.set('query',[q,place].filter(Boolean).join(' '));if(min!==undefined&&min!==null&&min!=='')u.searchParams.set('minPrice',String(min));if(max!==undefined&&max!==null&&max!=='')u.searchParams.set('maxPrice',String(max));return u.href;}
export function validateItemUrl(input){let u;try{u=new URL(input)}catch{throw Error('URL inválida');}if(u.protocol!=='https:'||!['www.facebook.com','facebook.com','m.facebook.com'].includes(u.hostname)||u.port||u.username||u.password)throw Error('Solo se permiten enlaces de Marketplace');let id=u.pathname.match(/^\/marketplace\/item\/(\d+)\/?$/)?.[1];if(!id)throw Error('Solo se permiten publicaciones individuales de Marketplace');return `https://www.facebook.com/marketplace/item/${id}/`;}
export function parseListingText(input){const s=String(input||'');let m=s.match(/(?:Description|Descripción)\s*\n([\s\S]*?)(?:\n(?:Seller information|Información del vendedor|Send seller a message|Enviar mensaje al vendedor|Report this listing|Denunciar esta publicación))/i);return (m?.[1]||'').trim().slice(0,9000);}
export async function browserCdpAddress(endpoint, lookup) {
  const url = new URL(endpoint);
  if (url.hostname !== 'facebook-browser') return endpoint;
  const {address} = await lookup(url.hostname, {family: 4});
  url.hostname = address;
  return url.href;
}
export function facebookSessionStatus(cookies) {
  return {savedSession: ['c_user', 'xs'].every(name => cookies.some(cookie => cookie.name === name && cookie.value))};
}
export function mercadoLibreSessionStatus(cookies) {
  return {savedSession: ['ssid', 'orguserid'].every(name => cookies.some(cookie => cookie.name === name && cookie.value))};
}
