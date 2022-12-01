import { invalid, redirect } from '@sveltejs/kit';
import * as database from '$lib/database'

/** @type {import('./$types').PageServerLoad} */
export const load = ({ request, locals }) => {

	return {
		test:"asd",
		mate:"asder",
	}

}

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await request.formData();


		// TODO: Implement login
		// Check if password and username
		// exists and is correct

		if (form.get('username') == "william") {
			return invalid(400, { message: "username invalid" })
		}

		cookies.set('userid', 'secret', {
			path: '/',
			httpOnly: true, // optional for now
			sameSite: 'strict',// optional for now
			secure: process.env.NODE_ENV === 'production',// optional for now
			maxAge: 120 //
		})

		throw redirect(302, '/')

	},
};
