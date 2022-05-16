export default function getHandler(url: string) {
  return async (request: Request) => {
    console.log(`downloader called for ${url}`);

    try {
      const response = await fetch(url);

      const { readable, writable } = new TransformStream();
      response.body?.pipeTo(writable);

      return new Response(readable, response);
    } catch (err) {
      return new Response(String(err), { status: 500 });
    }
  };
}
