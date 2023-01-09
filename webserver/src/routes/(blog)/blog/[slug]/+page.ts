import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post = await import(`/src/lib/posts/${params.slug}.svx`);
  
  const { title, date } = post.metadata;
  const content = post.default;

  return {
    content,
    title,
    date,
  };
};
