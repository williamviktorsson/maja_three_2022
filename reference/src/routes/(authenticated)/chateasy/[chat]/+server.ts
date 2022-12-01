import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { database } from "$lib/database";

export const streams: any = {};

export const GET: RequestHandler = async ({ locals, params }) => {
  
  const stream = new ReadableStream<string>({
    start(controller) {
      /* save the controller for the stream so that we can */
      /* enqueue messages into the stream */
      streams[locals.session!] = { controller, chat: params.chat };
    },
    cancel() {
      /* remove the stream */
      delete streams[locals.session!];
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
    },
  });
};
