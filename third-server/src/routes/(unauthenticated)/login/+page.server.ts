import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import * as database from '$lib/database'

export const load: PageServerLoad = ({ }) => {
	return {
		test: "tjena",
		urban: "123"
	}

}

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		const username = form.get("username")
		const password = form.get("password")

		// TODO: Implement login
		// Check if password and username
		// exists and is correct

		if (!username) {
			return invalid(400, { username: "username missing" })
		}

		if (!password) {
			return invalid(400, { password: "password missing" })
		}



		const client = await database.connect()
		const db = client.db('test')
		const collection = db.collection('users')

		const user = await collection.findOne({ username, password })

		if (!user) {
			return invalid(400, { user: "not found" })
		}


		cookies.set('userid', user._id.toString(), {
			path: '/',
			httpOnly: true, // optional for now
			sameSite: 'strict',// optional for now
			secure: process.env.NODE_ENV === 'production',// optional for now
			maxAge: 120 //
		})

		throw redirect(302, '/')

	},
};
