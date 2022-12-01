import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
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
		cookies.delete('userid')
		throw redirect(302, '/register')

	},
};
