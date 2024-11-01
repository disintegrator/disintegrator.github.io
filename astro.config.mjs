import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { autolinkConfig } from "./src/config/autolink.ts";

export default defineConfig({
	site: "https://blog.disintegrator.dev",
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		mdx(),
	],
	markdown: {
		shikiConfig: { theme: "css-variables" },
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig]],
		remarkRehype: {
			footnoteLabel: "Footnotes",
		},
		gfm: true,
	},
});
