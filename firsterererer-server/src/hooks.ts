import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
	// Check if the headers has userid cookie set
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	// set the locals object
	event.locals.userid = cookies['userid'];

	const response = await resolve(event);
	return response;
};
