import { error, json } from '@sveltejs/kit';
import { parse } from 'cookie';

import * as database from '$lib/database.js';


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const req = await request.json();

    const client = await database.connect(); // Connect to the mongoDB
    const db = client.db("test"); // select test db
    const collection = db.collection("users");  // select users collection

    // Check if password and username has been sent
    // else throw error with text describing whats wrong

    // Does the username already exist?

    // Is the password too simple?



    if (req) {
        // TODO: Dont just create the account. Validate that the user sent proper stuff
        // The user doesnt already exist & passwords are provided.
        collection.insertOne({ "username": "kalle", "password": "majarox" })
    }

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

    // does a cookie exist for the user id?
    // in other words, is the user signed in?
    
    // delete account connected to the session cookie.



    return json(body);
}
