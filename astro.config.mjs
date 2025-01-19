import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { autolinkConfig } from "./src/config/autolink.ts";

import expressiveCode from "astro-expressive-code";

export default defineConfig({
	site: "https://blog.disintegrator.dev",
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		expressiveCode({
			themes: ["github-dark-default", "everforest-light"],
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
