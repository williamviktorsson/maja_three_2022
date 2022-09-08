import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	
	// Check if the headers has userid cookie set
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	
	// set the locals object
	event.locals.token = cookies['token'];

	const response = await resolve(event);
	return response;
};
