import type {
  Auth,
  Encrypter,
  LoginResult,
  UIDRandomizer,
} from "$lib/interfaces/auth";
import { database } from "$lib/ssr";
import * as crypto from "crypto";

export class AdvancedUIDRandomizer implements UIDRandomizer {
  generate_unique_id(): string {
    return crypto.randomUUID();
  }
}

export class AdvancedEncrypter implements Encrypter {
  hash(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
  }
}

export class SQLiteAuth implements Auth {
  randomizer: UIDRandomizer = new AdvancedUIDRandomizer();
  encrypter: Encrypter = new AdvancedEncrypter();

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
            data: { user: "wrong credentials" },
          },
        };
      }

      const { salt, hash } = result;

      const newhash = this.encrypter.hash(password, salt);

      if (newhash != hash) {
        return {
          error: {
            code: 400,
            data: { user: "wrong credentials" },
          },
        };
      }

      const session = this.randomizer.generate_unique_id();

      const update = await database.user.update({
        where: { id: result.id },
        data: {
          session,
        },
      });

      return { success: { session: update.session } };
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
