import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/auth";

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();

    const {success,error} = await auth.login(form);
    
    if (error) {
      return fail(error.code, error.data);
    }

    else {
      cookies.set("session", success.session, {
        path: "/",
        httpOnly: true, // optional for now
        sameSite: "strict", // optional for now
        secure: process.env.NODE_ENV === "production", // optional for now
        maxAge: 1200, //
      });
      throw redirect(302, "/");
    }

  },
};
