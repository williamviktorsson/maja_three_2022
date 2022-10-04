import { forums, type Forum } from "$lib/state";
import { error, invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ params }) => {
  if (params.forum) {
    for (let index = 0; index < forums.length; index++) {
      const forum: Forum = forums[index];
      if (forum.id == params.forum) {
        return forum;
      }
    }
  }

  throw error(404, "forum not found");
};

export const actions: Actions = {
  write: async ({ request, params }) => {
    if (params.forum) {
      for (let index = 0; index < forums.length; index++) {
        const element = forums[index];
        if (element.id == params.forum) {
          const form = await request.formData();
          const message = form.get("message")?.toString();
          if (!message) {
            return invalid(400, { error: "missing message" });
          } else {
            element.messages.push(message);
          }
          return element;
        }
      }
    } else throw error(404, "forum not found");
  },
};
