import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { database } from "$lib/database";
import * as crypto from "crypto";

type ValidationReturn = { result: any; status: boolean }

let test: Array<string> = []
test.push

class LoginValidation {

  /**
   * it validates, duh
   * @param form the stuff i need
   * @returns the stuff u get
   */
  static validate(form: any): ValidationReturn {
    return { result: {}, status: true };
  }
}

export const actions: Actions = {
  login: async ({ request, locals, cookies }) => {
    const form = await request.formData();

    let { result, status } = LoginValidation.validate(form);

    if (!status) {
      throw fail(result.code, result.data);
    }

    throw redirect(302, "/");
  },
};
