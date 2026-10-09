// Erzeugt die Vorschauseiten /1/, /2/, … mit Open-Graph-Tags für WhatsApp & Co.
// Link-Vorschauen lesen nur das HTML (kein JavaScript, kein #), darum braucht jedes GIF eine eigene Seite.

export const SITE = 'https://durmexyt-dot.github.io/durma/';
export const TITLE = 'OKANO ♥️';
// Größe der selbst erzeugten Vorschaubilder (1.91:1 – das Format, das WhatsApp, Viber & Co. erwarten)
export const PREVIEW_W = 1200, PREVIEW_H = 630;

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Ersatz-Vorschaubild, falls kein eigenes JPEG erzeugt werden konnte: bei GIPHY das Standbild
export function previewImage(gif) {
  if (!/^https?:\/\//.test(gif)) return SITE + 'gifs/' + gif;
  try {
    const url = new URL(gif);
    const m = /(^|\.)giphy\.com$/.test(url.hostname) && url.pathname.match(/\/media\/(?:v1\.[^/]+\/)?([A-Za-z0-9]+)\/[^/]+$/);
    if (m) return `https://media.giphy.com/media/${m[1]}/giphy_s.gif`;
  } catch (e) {}
  return gif;
}

// hasPreview: ob n/preview.jpg existiert (JPEG auf der eigenen Seite – funktioniert auch in Viber)
export function sharePage(n, gif, hasPreview = false) {
  const url = `${SITE}${n}/`;
  const image = hasPreview ? `${url}preview.jpg` : previewImage(gif);
  const imageMeta = hasPreview ? `
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="${PREVIEW_W}">
  <meta property="og:image:height" content="${PREVIEW_H}">` : '';
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(TITLE)} #${n}</title>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(TITLE)}">
  <meta property="og:title" content="${esc(TITLE)}">
  <meta property="og:description" content="GIF #${n}">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:image" content="${esc(image)}">${imageMeta}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${esc(image)}">
  <style>body { margin: 0; background: #000; }</style>
  <script>location.replace('../#${n}');</script>
</head>
<body></body>
</html>
`;
}
