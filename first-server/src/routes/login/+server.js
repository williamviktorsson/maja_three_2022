import { error, json } from '@sveltejs/kit';
import { serialize } from 'cookie';

import * as database from '$lib/database.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, setHeaders }) {
    const req = await request.json();
    console.log(req);

    const client = await database.connect(); // Connect to the mongoDB
    const db = client.db("test"); // select test db
    const collection = db.collection("users");  // select users collection



    // check if a user exists in db where username and password matches

    // Check that password and username exists

    // check that password and username matches a user and password in database

    let result = await collection.findOne({ "username": "test", "password": "test" });

    // if success, set login session token.

    const body = { "login - post": "123" }

    if (false) {
        throw error(400, "user does not exist")
    }

    let user = {
        id: "secret"
    };


    setHeaders({
        'set-cookie': serialize('token', user.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 120 // two minutes
        })
    });

    return json(body);
}

/** @type {import('@sveltejs/kit').RequestHandler} */
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

    return json(body);
}
