export function marketplaceCoverage(){
  let attempts=0,success=0,scrolls=0;
  const found=new Set(),opened=new Set(),reasons=new Set();
  const reasonLabels={sin_resultados_nuevos:'sin resultados nuevos',limite_desplazamientos:'límite de desplazamientos',limite_resultados:'límite de resultados'};
  return {
    attempt(){attempts++},
    search(result){success++;scrolls+=result.desplazamientos;for(const item of result.publicaciones)found.add(item.url);if(reasonLabels[result.motivo_parada])reasons.add(reasonLabels[result.motivo_parada])},
    open(url){opened.add(url)},
    summary(){
      if(!attempts)return '';
      return `\n\n## Cobertura real de Marketplace\n\n- Búsquedas completadas: ${success} de ${attempts} intentos.\n- Recorrido: ${scrolls} desplazamientos en total.\n- Resultados: ${found.size} anuncios únicos encontrados en las listas; ${opened.size} ${opened.size===1?'anuncio abierto':'anuncios abiertos'} individualmente.\n- Motivos de parada: ${[...reasons].join(', ')||'no se completó ninguna búsqueda'}.\n\nLos anuncios encontrados en listas no equivalen a anuncios abiertos o verificados. La ubicación y el radio dependen de la configuración de Facebook; no se garantiza cobertura completa.`;
    },
  };
}
