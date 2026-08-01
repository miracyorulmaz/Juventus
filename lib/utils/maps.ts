const ALLOWED_MAP_HOSTS = new Set([
  'google.com',
  'www.google.com',
  'maps.google.com',
  'maps.app.goo.gl',
  'goo.gl',
]);

export function isSafeGoogleMapsUrl(value: string, allowEmpty = true) {
  if (!value.trim()) return allowEmpty;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ALLOWED_MAP_HOSTS.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}
