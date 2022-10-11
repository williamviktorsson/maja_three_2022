import { invalid, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import * as database from "$lib/database";
import * as crypto from "crypto"

export const actions: Actions = {
  login: async ({ request, locals, cookies }) => {
    const form = await request.formData();

    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();

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
      const client = await database.connect()
      const db = client.db("test");
      const collection = db.collection("users");

      const result = await collection.findOne({username});

      console.log(result)

      if (!result) {
        return invalid(400, {
          user: "wrong username + password combination",
        });
      }

      const {salt, hash} = result;

      const newhash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

      if (newhash!=hash) {
        return invalid(400, {
          user: "wrong username + password combination",
        });
      }

      const session = crypto.randomUUID();

      const update = await collection.updateOne({username},{$set:{
        session
      }})

      if(!update.acknowledged){
        return invalid(400, {
          user: "session generation failed",
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
