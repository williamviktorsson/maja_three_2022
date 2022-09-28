import type { Handle } from "@sveltejs/kit";
import * as database from "$lib/database";

// handle runs for every request to the server
export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");

  if (session) {
    const collection = await database.collection("users");
    let result = await collection.findOne({ session });
    if (result) {
      event.locals.session = session;
    }
  }

  return resolve(event);
};
