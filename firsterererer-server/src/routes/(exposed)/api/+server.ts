import { error, json } from '@sveltejs/kit';
import * as state from '$lib/state';
import type { RequestHandler, RequestEvent } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, setHeaders }) => {
	state.increase();

	const body = { '/api - post': 'success' };

	return json(body);
};

export const GET: RequestHandler = async ({ request, setHeaders }) => {
	return json(state.number);
};
