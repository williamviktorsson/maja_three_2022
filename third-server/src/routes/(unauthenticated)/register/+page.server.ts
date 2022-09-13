import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {

	if (locals.userid) {
		throw redirect(302, '/')
	}

}

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const form = await request.formData();

		// TODO: Implement register
		// Check if ustername already exist etc.


	},
};
