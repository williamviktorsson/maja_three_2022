/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	let userid = event.cookies.get('userid');

	if (userid) {
		event.locals.userid = userid;
	}

	return resolve(event);
};
