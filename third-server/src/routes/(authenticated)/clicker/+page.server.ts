import { database } from "$lib/database";
import { invalid } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const user = await database.users.findUnique({
    where: { session: locals.session },
  });
  const clicks = await database.clicker.findUnique({
    where: { userId: user?.id },
  });

  return { clicks: clicks?.clicks ?? 0 };
};

export const actions: Actions = {
  click: async ({ locals, request }) => {
    const user = await database.users.findUnique({
      where: { session: locals.session },
    });

    if (!user) {
      return invalid(404, { error: "user not found" });
    }
    const clicks = await database.clicker.upsert({
      where: { userId: user?.id },
      update: {
        clicks: {
          increment: 1,
        },
      },
      create: {
        userId: user?.id,
        clicks: 1,
      },
    });
  },
};
