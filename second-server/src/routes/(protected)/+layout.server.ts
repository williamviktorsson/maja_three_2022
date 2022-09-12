import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


export const load: LayoutServerLoad = async ({ locals }) => {
    // if not signed in, go to login
    if (!locals.userid) {
        throw redirect(307, '/login');
    } else return {
        userid: locals.userid
    }
}