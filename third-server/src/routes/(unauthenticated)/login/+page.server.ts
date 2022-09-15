import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import * as database from '$lib/database'

export const load: PageServerLoad = ({ }) => {
	return {
		test: "tjena",
		kompis: 1234,
		buddy: 123
	}

}

export const actions: Actions = {
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
