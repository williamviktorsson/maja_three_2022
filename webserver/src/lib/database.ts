import { PrismaClient } from "@prisma/client";
export const database = new PrismaClient();

export let streams: Record<
  string,
  Record<string, { controller: ReadableStreamDefaultController; chat: string }>
>;

export function init_ssr() {
  streams = {};
}
