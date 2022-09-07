import type { LayoutServerLoad } from './$types';

// i load säger vi vad som ska hämtas från servern och tillhandahållas
// som data till hemsidan i samma route

export const load: LayoutServerLoad = async ({ locals }) => {

    return {
        id: locals.userid
    };
};
