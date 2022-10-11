import * as database from "$lib/database";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import * as crypto from "crypto";

export const actions: Actions = {
  register: async ({ request, locals, cookies }) => {
    const form = await request.formData();

    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();

    if (username && password) {
      const client = await database.connect()
      const db = client.db("test");
      const collection = db.collection("users");

      let user = await collection.findOne({username})

      if (!user) {
        const session = crypto.randomUUID();

                // Creating a unique salt for a particular user
        const salt = crypto.randomBytes(16).toString('hex'); 
        // Should be saved in the database along with the hash

        // Hash the salt and password with 1000 iterations, 64 length and sha512 digest 
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');


        const created = await collection.insertOne({ username, hash, salt, session });

        if(!created.acknowledged){
          return {
            error: "error my guy",
          };
        }

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
