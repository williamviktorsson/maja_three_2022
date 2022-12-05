import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  if (locals.session) {
    throw redirect(302, "/");
  }
};
