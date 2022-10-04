import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  return {
    authenticated: locals.session != undefined,
  };
};
