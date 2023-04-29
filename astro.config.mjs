import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { autolinkConfig } from "./src/config/autolink";

export default defineConfig({
	site: "https://blog.disintegrator.dev",
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		mdx(),
		image({ serviceEntryPoint: "@astrojs/image/sharp" }),
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
