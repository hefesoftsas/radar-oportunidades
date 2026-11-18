import {validateItemUrl} from './marketplace-utils.mjs';

export function marketplaceScanLimit(requested){return Math.max(30,Math.min(80,Math.floor(Number(requested)||45)))}

// A pass reads the current DOM; a scroll requests the next batch from Facebook.
export async function collectMarketplaceListings({maxScans,maxResults,noNewLimit=4,readRows,advance,check,signal,onProgress=()=>{}}){
  const listings=new Map();
  let passes=0,scrolls=0,unchanged=0,atBottom=true,reason='limite_desplazamientos';
  for(let i=0;i<maxScans;i++){
    signal?.throwIfAborted();
    await check();
    const before=listings.size;
    for(const row of await readRows()){
      try{
        const url=validateItemUrl(row.url), text=String(row.text||'').trim();
        if(text&&!listings.has(url))listings.set(url,{url,resumen:text.slice(0,200)});
      }catch{}
      if(listings.size>=maxResults)break;
    }
    passes++;
    unchanged=listings.size===before&&atBottom?unchanged+1:0;
    if(passes===1||passes%5===0)onProgress({pasadas:passes,publicaciones:listings.size});
    if(listings.size>=maxResults){reason='limite_resultados';break}
    if(unchanged>=noNewLimit){reason='sin_resultados_nuevos';break}
    if(i<maxScans-1){signal?.throwIfAborted();const position=await advance();atBottom=position?.atBottom!==false;scrolls++}
  }
  return {publicaciones:[...listings.values()],pasadas:passes,desplazamientos:scrolls,motivo_parada:reason};
}
