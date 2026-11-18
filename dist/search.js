(function(root){
  function buildSearchUrl({query,location,min,max}){
    const q=String(query||'').trim();const place=String(location||'').trim();
    if(!q) throw new Error('Escribe un término de búsqueda.');
    for(const value of [min,max]) if(value!=='' && value!=null && !/^(?:\d+|\d{1,3}(?:\.\d{3})+)$/.test(String(value))) throw new Error('Ingresa precios válidos en pesos.');
    min=min==null?'':String(min).replace(/\./g,''); max=max==null?'':String(max).replace(/\./g,'');
    if(min!=='' && max!=='' && min!=null && max!=null && Number(min)>Number(max)) throw new Error('El precio mínimo no puede superar el máximo.');
    const url=new URL('https://www.facebook.com/marketplace/bogota/search/');
    url.searchParams.set('query',[q,place].filter(Boolean).join(' '));
    if(min!=='' && min!=null)url.searchParams.set('minPrice',String(min));
    if(max!=='' && max!=null)url.searchParams.set('maxPrice',String(max));
    return url.toString();
  }
  if(typeof module!=='undefined' && module.exports)module.exports={buildSearchUrl};
  else root.buildSearchUrl=buildSearchUrl;
})(typeof window!=='undefined'?window:globalThis);
