import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


export const load: LayoutServerLoad = async ({ locals }) => {
    // if signed in, go to home
    if (locals.userid) {
        throw redirect(307, '/');
    }
}