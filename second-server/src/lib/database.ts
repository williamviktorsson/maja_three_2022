import { MongoClient } from 'mongodb';

export async function connect(): Promise<MongoClient> {
	return await MongoClient.connect('mongodb://localhost:27017/');
}
