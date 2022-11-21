import { error, invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/database";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (params.chat) {
    try {
      const chat = await database.chat.findUniqueOrThrow({
        where: { id: Number(params.chat) },
        include: {
          messages: {
            include: { author: { select: { username: true, id: true } } },
          },
        },
      });
      if (chat) {
        const user = await database.user.findUniqueOrThrow({
          where: { session: locals.session },
        });
        return { chat, userid: user.id };
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
            await database.message.create({
              data: { authorId: user?.id, chatId: chat.id, content: message },
            });
          } catch (e) {
            return invalid(400, { error: "message creation error" });
          }
        }
      }
    } else throw error(404, "forum not found");
  },
};
