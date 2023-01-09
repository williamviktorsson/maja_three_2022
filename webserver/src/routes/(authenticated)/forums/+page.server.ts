import { forums } from "$lib/state";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return { forums };
};

export const actions: Actions = {
  add: async ({ request }) => {
    const form = await request.formData();
    const forumname = form.get("forumname")?.toString();
    if (!forumname) {
      return fail(400, { error: "missing forum name" });
    } else {
      forums.push({ id: crypto.randomUUID(), name: forumname, messages: [] });
    }
  },
};
