import { MongoClient, Collection } from "mongodb";

export async function connect(): Promise<MongoClient> {
  return await MongoClient.connect("mongodb://127.0.0.1:27017/");
}

export type User = {
  name: string;
  session: string;
};
