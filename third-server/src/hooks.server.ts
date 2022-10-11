import type { Handle } from "@sveltejs/kit";
import * as database from "$lib/database";

// handle runs for every request to the server
export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");

  if (session) {
    const client = await database.connect()
    const db = client.db("test");
    const collection = db.collection("users");

    let result = await collection.findOne({session});
    if (result?.session) {
      event.locals.session = result.session;
    }
  }

  return resolve(event);
};
