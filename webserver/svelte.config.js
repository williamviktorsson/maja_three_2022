import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex'



/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex({
		extensions: ['.md', '.svx'],
		layout: { blog: 'src/routes/(blog)/blog/post.svelte' },
	})],

	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md', '.svx']

};

export default config;