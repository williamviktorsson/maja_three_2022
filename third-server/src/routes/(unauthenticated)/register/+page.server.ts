import { database } from "$lib/database";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  register: async ({ request, locals, cookies }) => {
    const form = await request.formData();

    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();

    if (username && password) {
      let users = await database.users.findUnique({ where: { username } });

      if (!users) {
        const session = crypto.randomUUID();

        await database.users.create({
          data: { username, password, session },
        });

        cookies.set("session", session, {
          path: "/",
          httpOnly: true, // optional for now
          sameSite: "strict", // optional for now
          secure: process.env.NODE_ENV === "production", // optional for now
          maxAge: 120, //
        });
        throw redirect(302, "/");
      }
    }
    // TODO: Implement register
    // Check if ustername already exist etc.

    return {
      error: "error my guy",
    };
  },
};
