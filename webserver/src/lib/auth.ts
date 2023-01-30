import type { Auth } from "$lib/interfaces/auth";
import { SQLiteAuth } from "$lib/implementations/auth";

export const auth:Auth = new SQLiteAuth()

