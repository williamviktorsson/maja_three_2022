import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { database } from "$lib/database";

export const streams: Record<
  string,
  { controller: ReadableStreamDefaultController<string>; chat: string }
> = {};

export const GET: RequestHandler = async ({ locals, params }) => {
  if (params.chat) {
    try {
      const chat = await database.chat.findUniqueOrThrow({
        where: { id: Number(params.chat) },
      });
      if (chat && locals.session) {
        const user = await database.user.findUniqueOrThrow({
          where: { session: locals.session },
        });

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
      }
    } catch {
      throw error(404, "database items not found");
    }
  }

  throw error(404, "database items not found");
};
