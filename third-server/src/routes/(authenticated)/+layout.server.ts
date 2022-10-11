import type { LayoutServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import * as database from "$lib/database";
import { ObjectId } from "mongodb";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  if (locals.session) {


    const client = await database.connect()
    const db = client.db("test");
    const collection = db.collection("users");

    const user = await collection.findOne({session:locals.session})

    if (!user?.username) {
      throw error(404, "user not found for current session");
    }

    return {
      name: user.username,
    };
  } else {
    throw redirect(302, "/login");
  }
};
