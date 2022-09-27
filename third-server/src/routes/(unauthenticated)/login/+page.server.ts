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
	
	return;

    console.log(username);
    console.log(password);

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
      const client = await database.connect();
      const db = client.db("test");
      const collection = db.collection("users");

      const user: any = await collection.findOne({ username, password });

      cookies.set("userid", user._id.toString(), {
        path: "/",
        httpOnly: true, // optional for now
        sameSite: "strict", // optional for now
        secure: process.env.NODE_ENV === "production", // optional for now
        maxAge: 120, //
      });

      if (!user) {
        return invalid(400, { user: "not found" });
      }
    } catch (e) {
      return invalid(400, { server: "database connection error" });
    }

    throw redirect(302, "/");
  },
};
