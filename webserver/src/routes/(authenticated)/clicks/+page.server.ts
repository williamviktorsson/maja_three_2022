import { database } from "$lib/database";
import { invalid } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

let clickies: number[] = [];

export const load: PageServerLoad = async ({ locals }) => {
  return { clickies };
};

export const actions: Actions = {
  click: async ({ locals, request }) => {
    const form = await request.formData();
    const index = Number(form.get("index"));

    if (clickies.at(index) != undefined) {
      clickies[index]++;
    } else {
      return fail(400, { error: "index wong" });
    }
  },

  remove: async ({ locals, request }) => {
    const form = await request.formData();
    const index = Number(form.get("index"));

    if (clickies.at(index) != undefined) {
      clickies.splice(index, 1);
    } else {
      return fail(400, { error: "index wong" });
    }
  },
  add: async ({ locals, request }) => {
    clickies.push(0);
  },
};
