import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";

export default defineConfig({
	site: "https://blog.disintegrator.dev",
	integrations: [
		tailwind(),
		mdx(),
		image({ serviceEntryPoint: "@astrojs/image/sharp" }),
	],
});
