import getIndexHandler from "./handlers/index.handler";
import getDownloadsHandler from "./handlers/downloads.handler";
import { extractPath } from "./utils";
import Env from "./env";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const path = extractPath(request.url);
      console.log(`URL: ${request.url}, Path: ${path}`);
      switch (path) {
        case "":
          const indexHandler = getIndexHandler(env.BASE_URL);
          return indexHandler(request);
        case "favicon.ico":
          return new Response("Not found", { status: 404 });
        default:
          const downloadHandler = getDownloadsHandler(path);
          return downloadHandler(request);
      }
    } catch (err) {
      return new Response(String(err), { status: 500 });
    }
  },
};
