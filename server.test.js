/** @jest-environment node */
const fs = require('fs');
const os = require('os');
const path = require('path');

const { REDIRECTS, resolveFile, isHashedAsset, MIME } = require('./server');

describe('REDIRECTS', () => {
  it('maps the legacy reading URLs', () => {
    expect(REDIRECTS['/bt']).toBe('/basic-text');
    expect(REDIRECTS['/gg']).toBe('/it-works');
  });

  it('maps the legacy numeric inventory pages 0–6', () => {
    for (let i = 0; i <= 6; i++) expect(REDIRECTS['/' + i]).toBe('/inventory/' + i);
    expect(REDIRECTS['/7']).toBeUndefined();
  });
});

describe('isHashedAsset', () => {
  it('treats _expo/ assets and content-hashed files as immutable', () => {
    expect(isHashedAsset('/dist/_expo/static/js/app.js')).toBe(true);
    expect(isHashedAsset('/dist/assets/logo.a1b2c3d4.png')).toBe(true);
  });

  it('treats plain HTML as non-hashed', () => {
    expect(isHashedAsset('/dist/index.html')).toBe(false);
    expect(isHashedAsset('/dist/basic-text.html')).toBe(false);
  });
});

describe('resolveFile', () => {
  let root;

  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'dist-'));
    fs.writeFileSync(path.join(root, 'index.html'), 'home');
    fs.writeFileSync(path.join(root, 'basic-text.html'), 'bt');
    fs.mkdirSync(path.join(root, 'inventory'));
    fs.writeFileSync(path.join(root, 'inventory', '0.html'), 'step0');
    fs.mkdirSync(path.join(root, 'nested'));
    fs.writeFileSync(path.join(root, 'nested', 'index.html'), 'nested-index');
    fs.writeFileSync(path.join(root, 'robots.txt'), 'robots');
    fs.writeFileSync(path.join(os.tmpdir(), 'secret.txt'), 'top secret');
  });

  afterAll(() => fs.rmSync(root, { recursive: true, force: true }));

  it('serves index.html for /', () => {
    expect(resolveFile('/', root)).toBe(path.join(root, 'index.html'));
  });

  it('resolves clean URLs to their .html file', () => {
    expect(resolveFile('/basic-text', root)).toBe(path.join(root, 'basic-text.html'));
    expect(resolveFile('/inventory/0', root)).toBe(path.join(root, 'inventory', '0.html'));
  });

  it('resolves a directory to its index.html', () => {
    expect(resolveFile('/nested', root)).toBe(path.join(root, 'nested', 'index.html'));
  });

  it('serves files that already have an extension', () => {
    expect(resolveFile('/robots.txt', root)).toBe(path.join(root, 'robots.txt'));
  });

  it('returns null for unknown routes', () => {
    expect(resolveFile('/does-not-exist', root)).toBeNull();
  });

  it('blocks path traversal outside the root', () => {
    expect(resolveFile('/../secret.txt', root)).toBeNull();
    expect(resolveFile('/%2e%2e/secret.txt', root)).toBeNull();
  });
});

describe('MIME', () => {
  it('covers the common static types', () => {
    expect(MIME['.html']).toContain('text/html');
    expect(MIME['.js']).toContain('text/javascript');
    expect(MIME['.json']).toContain('application/json');
    expect(MIME['.png']).toBe('image/png');
  });
});
