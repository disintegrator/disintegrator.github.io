import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOGImage } from "../../../lib/og-render";

export async function getStaticPaths() {
	const posts = await getCollection("posts");
	return posts.map((post) => ({
		params: {
			slug: post.slug,
		},
		props: post,
	}));
}

export const GET: APIRoute = async function get({ params }) {
	const post = (await getCollection("posts")).find(
		(post) => post.slug === params.slug,
	);
	if (!post) {
		return new Response(null, {
			status: 404,
		});
	}

	const png = await renderOGImage(post.data.title, post.data.summary);

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};
