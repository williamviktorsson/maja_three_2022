import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let userid = event.cookies.get('userid');

	if (userid) {
		event.locals.userid = userid;
	}

	return resolve(event);
};
