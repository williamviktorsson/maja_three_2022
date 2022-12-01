import { invalid, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import * as database from '$lib/database'

export const load: PageServerLoad = async ({ locals }) => {

	let condition = {}

	if (condition) {
		return {
			message: "123",
			info: "abc"
		}
	} else {
		return {
			message: "123",
			something: 123
		}
	}
}

export const actions: Actions = {
	login: async ({ request, locals, cookies }) => {
		const form = await request.formData();

		let condition = {}

		if (condition)
			return invalid(400,{ message: "123", info: "abc" })
		else
			return invalid(400,{ message: "123", something: 123 })


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
