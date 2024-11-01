import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		tags: z.array(z.string()).optional(),
		publishDate: z.string().transform((str) => new Date(str)),
		draft: z.boolean().optional(),
	}),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
	posts: postsCollection,
};
