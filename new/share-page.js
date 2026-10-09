// Erzeugt die Vorschauseiten /1/, /2/, … mit Open-Graph-Tags für WhatsApp & Co.
// Link-Vorschauen lesen nur das HTML (kein JavaScript, kein #), darum braucht jedes GIF eine eigene Seite.

export const SITE = 'https://durmexyt-dot.github.io/durma/';
export const TITLE = 'OKANO ♥️';

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Vorschaubild: bei GIPHY das kleine Standbild (große GIFs zeigt WhatsApp oft gar nicht an)
export function previewImage(gif) {
  if (!/^https?:\/\//.test(gif)) return SITE + 'gifs/' + gif;
  try {
    const url = new URL(gif);
    const m = /(^|\.)giphy\.com$/.test(url.hostname) && url.pathname.match(/\/media\/(?:v1\.[^/]+\/)?([A-Za-z0-9]+)\/[^/]+$/);
    if (m) return `https://media.giphy.com/media/${m[1]}/giphy_s.gif`;
  } catch (e) {}
  return gif;
}

export function sharePage(n, gif) {
  const url = `${SITE}${n}/`;
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(TITLE)} #${n}</title>
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(TITLE)}">
  <meta property="og:description" content="GIF #${n}">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:image" content="${esc(previewImage(gif))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${esc(previewImage(gif))}">
  <style>body { margin: 0; background: #000; }</style>
  <script>location.replace('../#${n}');</script>
</head>
<body></body>
</html>
`;
}
