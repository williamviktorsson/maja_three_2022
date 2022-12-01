import { forums } from "$lib/state";
import { invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return { forums };
};

export const actions: Actions = {
  add: async ({ request }) => {
    const form = await request.formData();
    const forumname = form.get("forumname")?.toString();
    if (!forumname) {
      return invalid(400, { error: "missing forum name" });
    } else {
      forums.push({ id: crypto.randomUUID(), name: forumname, messages: [] });
    }
  },
};
