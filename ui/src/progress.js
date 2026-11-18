export function formatDuration(ms) {
  const seconds = Math.max(0, Math.floor((Number.isFinite(ms) ? ms : 0) / 1000));
  const hours = Math.floor(seconds / 3600), minutes = Math.floor(seconds % 3600 / 60), rest = seconds % 60;
  if (hours) return `${hours} h ${String(minutes).padStart(2, '0')} min`;
  if (minutes) return `${minutes} min ${String(rest).padStart(2, '0')} s`;
  return `${rest} s`;
}

export function deriveProgress(job, now = Date.now()) {
  const events = Array.isArray(job?.progress) ? job.progress.filter(x => x && typeof x.text === 'string') : [];
  const last = events.at(-1) || null;
  const active = ['ejecutando', 'en cola'].includes(job?.status);
  const created = Date.parse(job?.created || '');
  let batch = null, readRequests = 0, queryRequests = 0, batchEvent = null;
  for (const event of events) {
    const scan = event.text.match(/^Marketplace:\s*(\d+)\s+anuncios encontrados en\s+(\d+)\s+pasadas?\./i);
    const complete = event.text.match(/^Marketplace:\s*(\d+)\s+anuncios encontrados;\s*(\d+)\s+desplazamientos?\./i);
    if (scan) batchEvent = event, batch = {found: Number(scan[1]), passes: Number(scan[2]), scrolls: null, label: 'Recorrido en curso'};
    if (complete) batchEvent = event, batch = {found: Number(complete[1]), passes: null, scrolls: Number(complete[2]), label: 'Último recorrido completado'};
    if (/^Revisando Marketplace:/i.test(event.text)) readRequests++;
    if (/^Buscando en Marketplace:/i.test(event.text)) queryRequests++;
  }
  if (batch?.label === 'Recorrido en curso' && batchEvent !== last) batch.label = 'Último recorrido registrado';
  const text = last?.text || '';
  let phase = 'Preparando la investigación';
  if (job?.status === 'en cola') phase = 'En espera';
  else if (/^Marketplace:.*en\s+\d+\s+pasadas?/i.test(text)) phase = 'Recorriendo Marketplace';
  else if (/^Marketplace:.*desplazamientos?/i.test(text)) phase = 'Recorrido completado';
  else if (/^Mercado Libre:|^Buscando en Mercado Libre:/i.test(text)) phase = 'Consultando Mercado Libre';
  else if (/^Revisando Marketplace:/i.test(text)) phase = 'Revisiones solicitadas';
  else if (/^Buscando en Marketplace:/i.test(text)) phase = 'Consultas solicitadas';
  else if (/^(Buscando:|Revisando fuente:)/i.test(text)) phase = 'Consultando fuentes públicas';
  return {active, phase, elapsed: Number.isFinite(created) ? formatDuration(now-created) : null,
    latest: last?.text || '', latestAt: last?.at || null, found: batch?.found ?? null,
    passes: batch?.passes ?? null, scrolls: batch?.scrolls ?? null, batchLabel: batch?.label || null, readRequests, queryRequests};
}
