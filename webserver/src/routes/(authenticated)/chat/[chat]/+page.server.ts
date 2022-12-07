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
          messages: {
            include: {
              author: { select: { username: true, id: true } },
              likedBy: { select: { id: true } },
            },
          },
        },
      });
      if (chat) {
        const user = await database.user.findUniqueOrThrow({
          where: { session: locals.session },
        });

        chat.messages.forEach((e) => {
          e.own = e.authorId == user.id;
          e.liked = e.likedBy.find((usr) => usr.id == user.id) != undefined;
          console.log(e.liked);
        });

        return { chat };
      }
    } catch (e) {
      console.log(e)
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
              include: {
                author: { select: { username: true, id: true } },
                likedBy: { select: { id: true } },
              },
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
  like: async ({ request, params, locals }) => {
    if (params.chat) {
      const form = await request.formData();
      const messageId = form.get("messageId")?.toString();
      if (!messageId) {
        return invalid(400, { error: "missing messageId" });
      } else {
        const chat = await database.chat.findUnique({
          where: { id: Number(params.chat) },
        });
        if (chat?.id == Number(params.chat)) {
          try {
            console.log(messageId);
            const message = await database.message.findUniqueOrThrow({
              where: { id: Number(messageId) },
            });
            await database.user.update({
              where: { session: locals.session },
              data: {
                likes: { connect: { id: message.id } },
              },
            });
          } catch (e) {
            console.log(e);
            return invalid(400, { error: "message like error" });
          }
        }
      }
    } else throw error(404, "forum not found");
  },
  unlike: async ({ request, params, locals }) => {
    if (params.chat) {
      const form = await request.formData();
      const messageId = form.get("messageId")?.toString();
      if (!messageId) {
        return invalid(400, { error: "missing messageId" });
      } else {
        const chat = await database.chat.findUnique({
          where: { id: Number(params.chat) },
        });
        if (chat?.id == Number(params.chat)) {
          try {
            console.log(messageId);
            const message = await database.message.findUniqueOrThrow({
              where: { id: Number(messageId) },
            });
            await database.user.update({
              where: { session: locals.session },
              data: {
                likes: { disconnect: { id: message.id } },
              },
            });
          } catch (e) {
            console.log(e);
            return invalid(400, { error: "message unlike error" });
          }
        }
      }
    } else throw error(404, "forum not found");
  },
};
