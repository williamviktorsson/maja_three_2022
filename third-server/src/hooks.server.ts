import type { Handle } from "@sveltejs/kit";
import { database } from "$lib/database";

// handle runs for every request to the server
export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");

  if (session) {
    let result = await database.users.findUnique({ where: { session } });
    if (result?.session) {
      event.locals.session = result.session;
    }
  }

  return resolve(event);
};
