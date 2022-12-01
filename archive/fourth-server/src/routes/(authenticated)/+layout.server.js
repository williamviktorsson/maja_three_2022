import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ locals, cookies }) => {

    if (locals.userid) {
        return {
            userid: locals.userid,
            test: 123
        }
    } else {
        throw redirect(302, '/login')
    }

}