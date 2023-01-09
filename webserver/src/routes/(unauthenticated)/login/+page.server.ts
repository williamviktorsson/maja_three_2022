import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { database } from "$lib/database";
import * as crypto from "crypto";

export const actions: Actions = {
  login: async ({ request, locals, cookies }) => {
    const form = await request.formData();

    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();

    // TODO: Implement login
    // Check if password and username
    // exists and is correct'

    if (!username) {
      return fail(400, { username: "username missing" });
    }

    if (!password) {
      return fail(400, { password: "password missing" });
    }

    try {
      const result = await database.user.findFirst({
        where: { username },
      });

      console.log(result);

      if (!result) {
        return fail(400, {
          user: "wrong username + password combination",
        });
      }

      const { salt, hash } = result;

      const newhash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      if (newhash != hash) {
        return fail(400, {
          user: "wrong username + password combination",
        });
      }

      const session = crypto.randomUUID();

      const update = await database.user.update({
        where: { id: result.id },
        data: {
          session,
        },
      });

      cookies.set("session", update.session, {
        path: "/",
        httpOnly: true, // optional for now
        sameSite: "strict", // optional for now
        secure: process.env.NODE_ENV === "production", // optional for now
        maxAge: 1200, //
      });
    } catch (e) {
      console.log(e);
      return fail(400, { server: "database connection error" });
    }

    throw redirect(302, "/");
  },
};
