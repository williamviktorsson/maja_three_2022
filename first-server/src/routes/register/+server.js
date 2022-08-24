import { error, json } from '@sveltejs/kit';
import { parse } from 'cookie';

import * as database from '$lib/database.js';


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const req = await request.json();
/* 
    const client = await database.connect();
    const db = client.db("test"); */

    const body = { "register - post": "123" }

    const cookies = parse(request.headers.get('cookie') || '');

    console.log(cookies)


    return json(body);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {

    const cookies = parse(request.headers.get('cookie') || '');
    console.log(cookies)


/*     const client = await database.connect();
    const db = client.db("test"); */

    const body = { "register - delete": "123" }

    


    return json(body);
}
