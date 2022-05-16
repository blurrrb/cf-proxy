const template: string = `<!DOCTYPE html>
<html>
    <head>
        <title>
            Simple Proxy
        </title>
    </head>
    <body>
        <h2>Simple Proxy</h2>
        <hr />
        <p>Download any file, even from blocked sites.</p>
        <form>
          <label for="url_input">Enter url</label>
          <input name="url_input" id="url_input">
          <button id="go_btn">go</button>
        </form>
        <br />
        <small><bold>NOTE:</bold> The URL should start with http:// or https://</small>
        <script>
            const btn = document.querySelector("#go_btn");
            const inp = document.querySelector("#url_input");
            btn.addEventListener("click", (event) => {
                event.preventDefault();
                const url = "{{BASE_URL}}" + inp.value;
                window.location.href = url;
            })
        </script>
    </body>
</html>`;

let rendered: string | null = null;

function render(baseUrl: string) {
  rendered = template.replace(/\{\{BASE_URL\}\}/, baseUrl);
}

export default function getHandler(baseUrl: string) {
  if (!rendered) render(baseUrl);

  return async (request: Request): Promise<Response> => {
    return new Response(rendered, {
      headers: {
        "Content-Type": "",
      },
    });
  };
}
