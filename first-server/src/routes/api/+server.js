import { error, json } from '@sveltejs/kit';
import * as state from '$lib/state';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, setHeaders }) {

    state.increase();

    const body = { "/api - post": "success" }

    return json(body);
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request, setHeaders }) {

    return json(state.number);
}