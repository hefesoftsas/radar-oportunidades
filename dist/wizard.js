(function(root){
  function parsePesos(value){const s=String(value??'').replace(/\D/g,'');if(!s)return null;const n=Number(s);if(!Number.isSafeInteger(n))throw new Error('El valor es demasiado grande.');return n;}
  function formatPesos(value){const n=parsePesos(value);return n===null?'':new Intl.NumberFormat('es-CO').format(n);}
  function makeResearchPrompt({category='',query='',location='',min='',max='',rental='',details=''}){
    query=String(query).trim();location=String(location).trim();if(query.length<2)throw new Error('Indica qué buscas.');
    const low=parsePesos(min),high=parsePesos(max),rent=parsePesos(rental);if(low!==null&&high!==null&&low>high)throw new Error('El presupuesto mínimo supera al máximo.');
    const parts=[`Busca oportunidades de ${query} en Facebook Marketplace, Mercado Libre y fuentes públicas para la categoría ${category||'otros'}.`];
    if(location)parts.push(`Ubicación deseada: ${location}. Reconoce que Marketplace utiliza la ubicación y el radio configurados en Facebook.`);
    if(low!==null)parts.push(`Precio mínimo: $${formatPesos(low)} COP.`);if(high!==null)parts.push(`Precio máximo: $${formatPesos(high)} COP.`);
    if(category==='Vivienda'&&rent!==null)parts.push(`Prioriza inmuebles con potencial de arriendo superior a $${formatPesos(rent)} COP mensuales y sustenta la estimación con comparables.`);
    if(String(details).trim())parts.push(`Requisitos adicionales: ${String(details).trim()}.`);
    parts.push('Investiga varias publicaciones, compara precios y evidencia, incluye enlaces directos, advierte los datos no verificados y explica cuáles son las mejores oportunidades.');
    return parts.join(' ');
  }
  function summarizeSearch(v){const lines=[`${v.category}: ${String(v.query||'').trim()}`];if(String(v.location||'').trim())lines.push(`Zona: ${String(v.location).trim()}`);if(parsePesos(v.min)!==null)lines.push(`Desde $${formatPesos(v.min)} COP`);if(parsePesos(v.max)!==null)lines.push(`Hasta $${formatPesos(v.max)} COP`);if(v.category==='Vivienda'&&parsePesos(v.rental)!==null)lines.push(`Arriendo superior a $${formatPesos(v.rental)} / mes`);if(String(v.details||'').trim())lines.push(`También: ${String(v.details).trim()}`);return lines.join(' · ');}
  function connectionNext({loaded,secureControl,authenticated}){return !loaded?'wait':!secureControl?'secure':!authenticated?'authenticate':'open';}
  function validateRadarPassword(value){const n=String(value??'').length;return n<8?'Escribe una contraseña de al menos 8 caracteres.':n>128?'La contraseña debe tener como máximo 128 caracteres.':null;}
  const api={formatPesos,parsePesos,makeResearchPrompt,summarizeSearch,connectionNext,validateRadarPassword};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RadarWizard=api;
})(typeof window!=='undefined'?window:globalThis);
