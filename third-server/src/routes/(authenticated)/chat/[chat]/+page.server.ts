import { error, invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/database";
import { streams } from "./+server";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (params.chat) {
    try {
      const chat = await database.chat.findUniqueOrThrow({
        where: { id: Number(params.chat) },
        include: {
          messages: {include:{author:{select:{username:true}}}}
        },
      });
      if (chat) {
        const user = await database.user.findUniqueOrThrow({
          where: { session: locals.session },
        });

        chat.messages.forEach((e) => (e.own=e.authorId==user.id));

        return { chat };
      }
    } catch {
      throw error(404, "database items not found");
    }
  }

  throw error(404, "chat not found");
};

export const actions: Actions = {
  write: async ({ request, params, locals }) => {
    if (params.chat) {
      const form = await request.formData();
      const message = form.get("message")?.toString();
      if (!message) {
        return invalid(400, { error: "missing message" });
      } else {
        const chat = await database.chat.findUnique({
          where: { id: Number(params.chat) },
        });
        if (chat?.id == Number(params.chat)) {
          const user = await database.user.findUnique({
            where: { session: locals.session },
          });
          try {
            const msg = await database.message.create({
              data: { authorId: user?.id, chatId: chat.id, content: message },
              include: { author: { select: { username: true, id: true } } },
            });

            for (const session in streams) {
              /* send messages to all other streams exept own for this chat */
              const connection = streams[session];
              if (connection.chat == params.chat && session != locals.session) {
                /* enqueue messages to all streams for this chat */
                connection.controller.enqueue(JSON.stringify(msg));
              }
            }
          } catch (e) {
            return invalid(400, { error: "message creation error" });
          }
        }
      }
    } else throw error(404, "forum not found");
  },
};
