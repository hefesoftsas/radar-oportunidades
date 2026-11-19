import {marked} from 'marked';
import createDOMPurify from 'dompurify';

function listingInfo(href) {
  try {
    const u = new URL(href);
    if (u.protocol !== 'https:' || u.username || u.password || u.port) return null;
    if (['www.facebook.com', 'facebook.com', 'm.facebook.com'].includes(u.hostname)) {
      const id = u.pathname.match(/^\/marketplace\/item\/(\d+)\/?$/)?.[1];
      return id ? {source:'Facebook Marketplace', kind:'publicacion', id, key:`facebook:${id}`, url:u.href} : null;
    }
    if (u.hostname === 'mercadolibre.com.co' || u.hostname.endsWith('.mercadolibre.com.co')) {
      const catalog = u.pathname.match(/\/p\/(MCO\d+)(?:\/|$)/i);
      const item = u.pathname.match(/\/(MCO-?\d+)(?:[-_/]|$)/i);
      if (!catalog && !item) return null;
      const id = (catalog || item)[1].toUpperCase().replace('-', '');
      return {source:'Mercado Libre', kind:catalog?'catalogo':'publicacion', id, key:`mercadolibre:${id}`, url:u.href};
    }
    if (u.hostname === 'fincaraiz.com.co' || u.hostname.endsWith('.fincaraiz.com.co')) {
      const id = u.pathname.match(/\/(\d{7,})\/?$/)?.[1];
      return id ? {source:'Finca Raíz', kind:'publicacion', id, key:`fincaraiz:${id}`, url:u.href} : null;
    }
  } catch {}
  return null;
}

function linkSupportedReferences(fragment, document, activity) {
  const listings = new Map();
  for (const anchor of fragment.querySelectorAll('a[href]')) {
    const info = listingInfo(anchor.href);
    if (info?.source === 'Facebook Marketplace') listings.set(info.id, info.url);
  }
  for (const event of Array.isArray(activity) ? activity : []) {
    const match = String(event?.text || '').match(/^Revisando Marketplace:\s*(https:\/\/\S+)\s*$/i);
    const info = match && listingInfo(match[1]);
    if (info?.source === 'Facebook Marketplace') listings.set(info.id, info.url);
  }
  const walker = document.createTreeWalker(fragment, document.defaultView.NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.parentElement?.closest('a,code,pre')) nodes.push(node);
  }
  for (const node of nodes) {
    const text = node.nodeValue, pattern = /\bitem\s*[#:]?\s*(\d{5,25})\b|(?<![\w/:])\/p\/MCO\d+\b/gi;
    let match, offset = 0, changed = false;
    const replacement = document.createDocumentFragment();
    while ((match = pattern.exec(text))) {
      const url = match[1] ? listings.get(match[1]) : 'https://www.mercadolibre.com.co' + match[0];
      replacement.append(document.createTextNode(text.slice(offset, match.index)));
      if (url) {
        const a = document.createElement('a');a.href = url;a.textContent = match[0];a.target = '_blank';a.rel = 'noopener noreferrer';
        replacement.append(a);
      } else replacement.append(document.createTextNode(match[0] + ' (enlace no disponible)'));
      offset = pattern.lastIndex;changed = true;
    }
    if (changed) {replacement.append(document.createTextNode(text.slice(offset)));node.replaceWith(replacement);}
  }
}

// Reports are generated from external listings; treat their contents as untrusted.
export function renderReport(root, source, activity = []) {
  const document = root.ownerDocument;
  const purifier = createDOMPurify(document.defaultView);
  const html = marked.parse(String(source ?? ''), {gfm: true});
  const fragment = purifier.sanitize(html, {
    RETURN_DOM_FRAGMENT: true,
    ALLOWED_TAGS: ['a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'del', 'blockquote', 'pre', 'code', 'hr', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'title', 'align'],
    ALLOW_DATA_ATTR: false,
  });
  for (const link of fragment.querySelectorAll('a[href]')) {
    try {
      const raw = link.getAttribute('href');
      if (/^\/p\/MCO\d+\/?$/i.test(raw)) link.setAttribute('href', 'https://www.mercadolibre.com.co' + raw);
      const url = new URL(link.getAttribute('href'), document.baseURI);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported link');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } catch {
      link.removeAttribute('href');
    }
  }
  linkSupportedReferences(fragment, document, activity);
  for (const table of fragment.querySelectorAll('table')) {
    const container = document.createElement('div');
    container.className = 'report-table-scroll';
    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', 'Tabla del informe; desplázate horizontalmente para ver todas las columnas');
    container.tabIndex = 0;
    table.replaceWith(container);
    container.append(table);
  }
  root.replaceChildren(fragment);
}

// Present listing links already present in the report, irrespective of its layout.
export function extractHighlights(root) {
  const result = [], seen = new Set();
  for (const link of root.querySelectorAll('a[href]')) {
    const info = listingInfo(link.href);
    if (!info || seen.has(info.key)) continue;
    seen.add(info.key);
    const block = link.closest('li,tr') || link.closest('p');
    let title = '';
    if (block && [...block.querySelectorAll('a[href]')].filter(a=>listingInfo(a.href)).length === 1) {
      const copy = block.cloneNode(true);copy.querySelectorAll('a').forEach(a=>a.remove());
      title = copy.textContent.replace(/\s+/g,' ').trim();
      if (/^(?:enlace|fuente|ver|publicaci[oó]n)\s*:?$/i.test(title)) title = '';
    }
    if (!title) {
      for (let node = block || link; node && node !== root && !title; node = node.parentElement) {
        for (let prev = node.previousElementSibling; prev; prev = prev.previousElementSibling) {
          if (/^H[1-6]$/.test(prev.tagName)) {title = prev.textContent.trim();break;}
        }
      }
    }
    const anchorTitle = link.textContent.trim();
    if (!title && anchorTitle && !/^https?:\/\//i.test(anchorTitle)) title = anchorTitle;
    result.push({title:(title || (info.kind==='catalogo'?'Catálogo de Mercado Libre':'Publicación en '+info.source)).slice(0,140), url:info.url, source:info.source, kind:info.kind});
  }
  return result;
}
