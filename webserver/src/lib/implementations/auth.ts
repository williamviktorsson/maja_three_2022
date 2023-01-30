import type { Auth, LoginResult } from "$lib/interfaces/auth";
import { database } from "$lib/database";
import * as crypto from "crypto";

export class SQLiteAuth implements Auth {
  async login(form: FormData): Promise<LoginResult> {
    
    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();

    if (!username) {
      return { error: { code: 400, data: { username: "username missing" } } };
    }

    if (!password) {
      return { error: { code: 400, data: { password: "password missing" } } };
    }

    try {
      const result = await database.user.findFirst({
        where: { username },
      });

      console.log(result);

      if (!result) {
        return {
          error: {
            code: 400,
            data: { user: "wrong username + password combination" },
          },
        };
      }

      const { salt, hash } = result;

      const newhash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      if (newhash != hash) {
        return {
          error: {
            code: 400,
            data: { user: "wrong username + password combination" },
          },
        };
      }

      const session = crypto.randomUUID();

      const update = await database.user.update({
        where: { id: result.id },
        data: {
          session,
        },
      });

      return { success: { session:update.session } };
    } catch (e) {
      console.log(e);
      return {
        error: {
          code: 400,
          data: { server: "database connection error" },
        },
      };
    }
  }
}
