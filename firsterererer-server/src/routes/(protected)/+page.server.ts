import * as state from '$lib/state';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

// i load säger vi vad som ska hämtas från servern och tillhandahållas
// som data till hemsidan i samma route

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.userid) {
		throw redirect(307, '/login');
	}

	return {
		number: state.number,
		kalle: 'urban',
		elof: 'sinan 123',
		sixten: [123, 456]
	};
};

// en post funktion körs t.ex. när vi submittar en form med en post. Eller om vi kör ett fetch anrop
// met metodon POST

export const actions: Actions = {
	default: async ({ request }) => {
		state.increase();

		// Vi kan skicka med errors ifall nått gått fel. te.x. skrivit in fel lösenord.
		// Då tilldelas den json vi skickar tillbaka till variabeln errors som finss längst upp i script
		// taggen på hemsidan.
	},
	signout: async ({ cookies }) => {
		// DELETE to login means logout
		// Remove session token if it exists.
		cookies.delete('userid')
		throw redirect(307, '/login');
	}
};
