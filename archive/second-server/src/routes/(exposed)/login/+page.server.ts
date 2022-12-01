import { redirect, invalid } from '@sveltejs/kit';

import * as database from '$lib/database';
import type { PageServerLoad, Actions } from './$types';

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

		// check if a user exists in db where username and password matches

		// Check that password and username exists

		// check that password and username matches a user and password in database

		const result = await collection.findOne({ username, password });

		// if success, set login session token.


		if (result) {


			const user = {
				id: 'secret'
			};

			cookies.set('userid', user.id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 120 // two minutes
			});

			throw redirect(307, '/');
		} else {
			return invalid(400, { message: "invalid credentials" })
		}
	},

};
