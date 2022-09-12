import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	signout: async ({ cookies }) => {
		cookies.delete('userid')
		throw redirect(307, '/login');
	}
};
