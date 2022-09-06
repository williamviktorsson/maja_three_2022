import { redirect, invalid } from '@sveltejs/kit';
import * as database from '$lib/database';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.userid) {
		throw redirect(307, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const req = await request.formData();
		const username = req.get('username');
		const password = req.get('password');
		console.log({ username, password });

		const client = await database.connect(); // Connect to the mongoDB
		const db = client.db('test'); // select test db
		const collection = db.collection('users'); // select users collection

		// Check if password and username has been sent
		// else throw error with text describing whats wrong

		// Does the username already exist?

		// Is the password too simple?
		if (!req) {
			return invalid(400, {
				message: 'Something went wrong',
				info: 'test'
			});
		}

		if (!req) {
			// TODO: Dont just create the account. Validate that the user sent proper stuff
			// The user doesnt already exist & passwords are provided.
			collection.insertOne({ username: 'kalle', password: 'majarox' });
		}


		console.log(cookies);
	},
	delete: async ({ request, cookies }) => {
		console.log(cookies);

		/*     const client = await database.connect();
			const db = client.db("test"); */


		// does a cookie exist for the user id?
		// in other words, is the user signed in?

		// delete account connected to the session cookie.
	}
};
