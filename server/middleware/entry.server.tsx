import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, StaticRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
// import { renderToPipeableStream } from "react-dom/server.node";
import { renderToReadableStream } from "react-dom/server";
import App from "../../app/App.tsx";

export const streamTimeout = 5_000;

export default async function handleRequest(
  request: Request,
  responseHeaders: Headers,
) {
  // https://github.com/vitejs/vite/issues/1984

  const m = await import("../../app/routes/home.tsx");
  console.log("m", m.loader);

  const stream = await renderToReadableStream(
    <StaticRouter location={request.url}>
      <html>
        <head>
          <title>Hello World</title>
          <script type="module">
            {`import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true`}
          </script>
          <link rel="stylesheet" href="/app/App.css" />
        </head>
        <body>
          <App />
          <script type="module" src="/app/main.tsx" />
        </body>
      </html>
    </StaticRouter>,
  );
  responseHeaders.set("Content-Type", "text/html");
  return new Response(stream, {
    headers: responseHeaders,
    // status: responseStatusCode,
  });

  // Abort the rendering stream after the `streamTimeout` so it has time to
  // flush down the rejected boundaries
  // setTimeout(abort, streamTimeout + 1000);
}
