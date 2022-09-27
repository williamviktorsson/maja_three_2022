import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import * as database from '$lib/database'
import { ObjectId } from 'mongodb';


export const load: LayoutServerLoad = async ({ locals, cookies }) => {

    if (locals.userid) {

       /*  const client = await database.connect()
        const db = client.db('test')
        const collection = db.collection('users')

        const user = await collection.findOne({ "_id": new ObjectId(locals.userid) }) */

        return {
            name: 'Name not found',
            userid: locals.userid,
            test: "123",
            feeling: "asdash"
        }
    } else {
        throw redirect(302, '/login')
    }

}