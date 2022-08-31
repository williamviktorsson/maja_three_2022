import * as state from '$lib/state';

/** @type {import('./$types').PageServerLoad} */
export function load() {
    return {
        number: state.number,
    };
}

/** @type {import('./$types').Action} */
export async function POST() {

    state.increase();

    return {
        errors: {
            test: "asd"
        }
    }

}