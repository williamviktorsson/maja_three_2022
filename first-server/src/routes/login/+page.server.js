import { error, json, redirect } from '@sveltejs/kit';
import { serialize } from 'cookie';

import * as database from '$lib/database.js';

let loggedin = false;

/** @type {import('./$types').PageServerLoad} */
export function load(request) {

    if (!request.locals.token) {
        loggedin = false
    } else {
        loggedin = true
    }

    return {
        loggedin
    };
}


/** @type {import('@sveltejs/kit').Action} */
export async function POST({ request, setHeaders }) {
    const req = await request.formData();
    console.log(req);



    const client = await database.connect(); // Connect to the mongoDB
    const db = client.db("test"); // select test db
    const collection = db.collection("users");  // select users collection


    let user = {
        id: "secret"
    };


    setHeaders({
        'set-cookie': serialize('token', user.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 10 // two minutes
        })
    });

    loggedin = true;

    throw redirect (302,'/')


}

/** @type {import('@sveltejs/kit').Action} */
export async function DELETE({ setHeaders }) {

    const body = { "login - delete": "123" }

    // DELETE to login means logout
    // Remove session token if it exists.

    setHeaders({
        'set-cookie': serialize('token', "", {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0 // one minute
        })
    });

    loggedin = false;

}
