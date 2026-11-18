import {marked} from 'marked';
import createDOMPurify from 'dompurify';

// Reports are generated from external listings; treat their contents as untrusted.
export function renderReport(root, source) {
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
      const url = new URL(link.getAttribute('href'), document.baseURI);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported link');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } catch {
      link.removeAttribute('href');
    }
  }
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

// Present only actual item links and headings that are already in the report.
export function extractHighlights(root) {
  const result = [], seen = new Set();
  for (const heading of root.querySelectorAll('h3')) {
    let node = heading.nextElementSibling, link = null;
    while (node && !/^H[1-3]$/.test(node.tagName)) {
      link = [...node.querySelectorAll('a[href]')].find(a => {
        try { const u = new URL(a.href); if(u.protocol!=='https:'||u.username||u.password||u.port)return false; if(['www.facebook.com','facebook.com','m.facebook.com'].includes(u.hostname))return /^\/marketplace\/item\/\d+\/?$/.test(u.pathname);return (u.hostname==='mercadolibre.com.co'||u.hostname.endsWith('.mercadolibre.com.co'))&&(/\/MCO-?\d+/i.test(u.pathname)||/\/p\/MCO\d+/i.test(u.pathname)); } catch { return false; }
      });
      if (link) break;
      node = node.nextElementSibling;
    }
    if (link && !seen.has(link.href)) {
      seen.add(link.href);
      result.push({title: heading.textContent.trim().slice(0,140), url: link.href, source: new URL(link.href).hostname.endsWith('mercadolibre.com.co')?'Mercado Libre':'Facebook Marketplace'});
    }
    if (result.length === 6) break;
  }
  return result;
}
