import type { Hiscores } from "$lib/do_not_modify/hiscores";
import { InMemoryHiscores } from "./inmemory_hiscores";
import { MongoDBHiscores } from "./mongodb_hiscores";
import { SQLiteHiscores } from "./sqlite_hiscores";

/* TODO: ADD THE CORRECT IMPLEMENTATIONS */

export const implementations: Record<string, Hiscores> = {
  mongodb: new MongoDBHiscores(),
  sqlite: new SQLiteHiscores(),
  inmemory: new InMemoryHiscores(),
};
