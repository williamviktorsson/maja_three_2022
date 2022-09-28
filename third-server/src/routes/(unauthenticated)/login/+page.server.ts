import { invalid, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import * as database from "$lib/database";

export const actions: Actions = {
  login: async ({ request, locals, cookies }) => {
    const form = await request.formData();

    const username = form.get("username");
    const password = form.get("password");

    cookies.set("userid", "secret".toString(), {
      path: "/",
      httpOnly: true, // optional for now
      sameSite: "strict", // optional for now
      secure: process.env.NODE_ENV === "production", // optional for now
      maxAge: 1200, //
    });

    // TODO: Implement login
    // Check if password and username
    // exists and is correct

    if (!username) {
      return invalid(400, { username: "username missing" });
    }

    if (!password) {
      return invalid(400, { password: "password missing" });
    }

    try {
      const collection = await database.collection("users");

      const result = await collection.findOne({ username, password });

      if (!result) {
        return invalid(400, {
          user: "wrong username + password combination",
        });
      }

      const session = crypto.randomUUID();

      const update = await collection.updateOne(
        { username, password },
        { $set: { session } }
      );

      if (!update.acknowledged) {
        return invalid(400, {
          user: "session creation failed",
        });
      }

      cookies.set("session", session, {
        path: "/",
        httpOnly: true, // optional for now
        sameSite: "strict", // optional for now
        secure: process.env.NODE_ENV === "production", // optional for now
        maxAge: 120, //
      });
    } catch (e) {
      return invalid(400, { server: "database connection error" });
    }

    throw redirect(302, "/");
  },
};
