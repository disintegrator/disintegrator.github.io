import type { APIRoute } from "astro";
import { renderOGImage } from "../../lib/og-render";

export const GET: APIRoute = async function get() {
	const png = await renderOGImage("Blog", "Georges Haidar");

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};
