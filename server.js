/**
 * Production static server for the Expo web export (dist/), for Heroku.
 *
 * - Serves dist/ with clean URLs (/basic-text -> basic-text.html)
 * - 301-redirects legacy URLs (/bt, /gg, and the old numeric form pages)
 * - Forces HTTPS behind Heroku's proxy
 * - Long-caches hashed assets, no-cache for HTML
 *
 * Zero runtime dependencies (Node built-ins only). Build dist/ first with
 * `npm run build:web` (Heroku does this via the heroku-postbuild script).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// Permanent redirects from the legacy site's URLs.
const REDIRECTS = { '/bt': '/basic-text', '/gg': '/it-works' };
for (let i = 0; i <= 6; i++) REDIRECTS['/' + i] = '/inventory/' + i;

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

/** Map a URL path to a file inside `root`, honoring clean URLs. Guards traversal. */
function resolveFile(urlPath, root = DIST) {
  const clean = decodeURIComponent(urlPath);
  const rel = path.normalize(clean).replace(/^(\.\.(\/|\\|$))+/, '');
  const base = path.join(root, rel);
  if (base !== root && !base.startsWith(root + path.sep)) return null;

  if (path.extname(base)) return isFile(base) ? base : null;
  const candidates = [base + '.html', path.join(base, 'index.html')];
  if (clean === '/') candidates.unshift(path.join(root, 'index.html'));
  return candidates.find(isFile) || null;
}

/** Content-hashed assets are safe to cache forever; HTML is not. */
function isHashedAsset(file) {
  return file.includes(path.sep + '_expo' + path.sep) || /\.[0-9a-f]{8,}\./.test(file);
}

const server = http.createServer((req, res) => {
  // Heroku terminates TLS at its router; redirect http -> https.
  if (IS_PROD && req.headers['x-forwarded-proto'] !== 'https') {
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
    return res.end();
  }

  const urlPath = req.url.split('?')[0];

  if (REDIRECTS[urlPath]) {
    res.writeHead(301, { Location: REDIRECTS[urlPath] });
    return res.end();
  }

  const file = resolveFile(urlPath);
  if (file) {
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': isHashedAsset(file) ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    return fs.createReadStream(file).pipe(res);
  }

  // Unknown route -> the exported 404 page.
  const notFound = path.join(DIST, '+not-found.html');
  if (isFile(notFound)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(notFound).pipe(res);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

// Only listen when run directly (`node server.js`); when required by tests the
// helpers below are exported without opening a port.
if (require.main === module) {
  server.listen(PORT, () => console.log(`Serving dist/ on port ${PORT}`));
}

module.exports = { MIME, REDIRECTS, resolveFile, isHashedAsset };
