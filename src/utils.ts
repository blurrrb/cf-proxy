const pathRegex = /https?:\/\/[^/]*\/(.*)/;

export function extractPath(url: string): string {
  const match = url.match(pathRegex);
  if (!match) return "";
  return match[1];
}
