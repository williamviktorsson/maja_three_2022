import { invalid, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as database from '$lib/database'
import { ObjectId } from 'mongodb';

export const actions: Actions = {
	logout: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		// TODO: Implement register
		// Check if ustername already exist etc.
		cookies.delete('userid')
		throw redirect(302, '/login')

	},
	deleteaccount: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		// TODO: Implement delete account
		// Check if ustername already exist etc.

		const client = await database.connect()
		const db = client.db('test')
		const collection = db.collection('users')

		const result = await collection.deleteOne({ "_id": new ObjectId(locals.userid) })

		if(!result.acknowledged || result.deletedCount!=1){
			return invalid(400,{delete:"failed"})
		}

		cookies.delete('userid')
		throw redirect(302, '/register')

	},
};
