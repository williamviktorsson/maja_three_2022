import { MongoClient, Collection } from "mongodb";

export async function connect(): Promise<MongoClient> {
  return await MongoClient.connect("mongodb://localhost:27017/");
}

export async function collection(name: string): Promise<Collection> {
  const client = await connect();
  const db = client.db("test");
  const collection = db.collection(name);
  return collection;
}

export type User = {
  name: string;
  session: string;
};
