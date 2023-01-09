import type { Hiscores } from "$lib/do_not_modify/hiscores";
import { MongoDBHiscores } from "./mongodb_hiscores";

export const implementations: Record<string, Hiscores> = {
  mongodb: new MongoDBHiscores(),
  sqlite: new MongoDBHiscores(),
  inmemory: new MongoDBHiscores(),
};
