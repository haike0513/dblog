import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, StaticRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
// import { renderToPipeableStream } from "react-dom/server.node";
import { renderToReadableStream } from "react-dom/server";

export const streamTimeout = 5_000;

export default async function handleRequest(
  request: Request,
  responseHeaders: Headers,
) {


  const stream = await renderToReadableStream(
    <StaticRouter location={request.url}>
      <script src="/app/entry.client.tsx" />

    </StaticRouter>
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
