export const fetchMarkdownPosts = async () => {
  const allPostFiles = import.meta.glob("/src/lib/posts/*.svx");
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = (await resolver()) as any;
      const id = path.slice(15, -4);
      const postPath = `/blog/${id}`;
      return {
        meta: metadata,
        path: postPath,
      };
    })
  );

  return allPosts;
};
