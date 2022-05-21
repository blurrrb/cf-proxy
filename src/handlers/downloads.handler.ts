const hostRegex = /https?:\/\/([^\/]*)(\/.*)?/;

function getHost(url: string): string {
  const match = url.match(hostRegex);
  if (!match) return "";
  return match[1];
}

export default function getHandler(url: string) {
  return async (request: Request) => {
    try {
      const proxyRequest = new Request(url, request);
      // rewrite host information
      proxyRequest.headers.set("Host", getHost(url));
      console.log("proxy", proxyRequest.headers.get("Host"));

      const response = await fetch(proxyRequest);
      const { readable, writable } = new TransformStream();
      response.body?.pipeTo(writable);

      return new Response(readable, response);
    } catch (err) {
      return new Response(String(err), { status: 500 });
    }
  };
}
