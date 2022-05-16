export default function getHandler(url: string) {
  return async (request: Request) => {
    try {
      const proxyRequest = new Request(url, request);
      const response = await fetch(proxyRequest);
      const { readable, writable } = new TransformStream();
      response.body?.pipeTo(writable);

      return new Response(readable, response);
    } catch (err) {
      return new Response(String(err), { status: 500 });
    }
  };
}
