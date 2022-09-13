import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


export const load: LayoutServerLoad = async ({ locals, cookies }) => {

    if (locals.userid) {
        return {
            userid: locals.userid,
        }
    }

}