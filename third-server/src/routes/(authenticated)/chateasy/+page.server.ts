import { invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/database";

export const load: PageServerLoad = async () => {
  const chats = await database.chat.findMany();
  return { chats };
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
};
