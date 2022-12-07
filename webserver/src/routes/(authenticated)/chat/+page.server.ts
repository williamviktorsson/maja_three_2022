import { invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/database";

export const load: PageServerLoad = async ({ locals }) => {
  const chats = await database.chat.findMany();
  const favoriteChats = await database.user.findUniqueOrThrow({
    where: { session: locals.session },
    select: {
      favoriteChats: { select: { id: true } },
    },
  });

  return { chats, favoriteChats: favoriteChats.favoriteChats.map((e) => e.id) };
};

export const actions: Actions = {
  add: async ({ request }) => {
    const form = await request.formData();
    const forumname = form.get("chatname")?.toString();
    if (!forumname) {
      return invalid(400, { error: "missing chat name" });
    } else {
      try {
        await database.chat.create({
          data: { name: forumname },
        });
      } catch (e) {
        return invalid(400, { error: "chat creation error" });
      }
    }
  },
  favorite: async ({ request, locals }) => {
    const form = await request.formData();
    const chatId = form.get("chatId")?.toString();
    if (!chatId) {
      return invalid(400, { error: "missing chatId" });
    } else {
      try {
        const user = await database.user.findUniqueOrThrow({
          where: { session: locals.session },
        });

        await database.chat.update({
          where: {
            id: Number(chatId),
          },
          data: {
            favoritedBy: {
              connect: { id: user.id },
            },
          },
        });
      } catch (e) {
        console.log(e);
        return invalid(400, { error: "chat favorite error" + e });
      }
    }
  },
  unfavorite: async ({ request, locals }) => {
    const form = await request.formData();
    const chatId = form.get("chatId")?.toString();
    if (!chatId) {
      return invalid(400, { error: "missing chatId" });
    } else {
      try {
        const user = await database.user.findUniqueOrThrow({
          where: { session: locals.session },
        });

        await database.chat.update({
          where: {
            id: Number(chatId),
          },
          data: {
            favoritedBy: {
              disconnect: { id: user.id },
            },
          },
        });
      } catch (e) {
        console.log(e);
        return invalid(400, { error: "chat favorite error" + e });
      }
    }
  },
};
