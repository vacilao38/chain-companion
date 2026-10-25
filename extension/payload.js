export function draftFromTab(tab = {}) {
  const url = new URL(tab.url || '');
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.href.length > 8192) {
    throw new Error('Abra uma página HTTP/HTTPS para guardar no Chain.');
  }
  return {schema: 1, url: url.href, title: String(tab.title || url.hostname).slice(0, 180)};
}

export function newer(remote, installed) {
  if (!/^\d+\.\d+\.\d+$/.test(remote) || !/^\d+\.\d+\.\d+$/.test(installed)) return false;
  const a = remote.split('.').map(Number), b = installed.split('.').map(Number);
  for (let i = 0; i < 3; i++) { if (a[i] !== b[i]) return a[i] > b[i]; }
  return false;
}

export function updateFromFeed(data, installed) {
  if (data?.protocol !== 'clustter.update' || data.schema !== 1) return null;
  const release = data.apps?.['chain-extension']?.browser;
  if (!release || !newer(release.version, installed) || release.page !== 'https://vacilao38.github.io/clustter-cores-downloads/#chain-extension') return null;
  return release;
}
