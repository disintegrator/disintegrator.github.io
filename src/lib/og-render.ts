import fs from "node:fs/promises";
import { jsx } from "react/jsx-runtime";
import satori from "satori";
import sharp from "sharp";

const fontData = await fs.readFile("./public/fonts/InterDisplay-Regular.otf");

export async function renderOGImage(title: string, summary: string) {
	const svg = await satori(
		jsx("div", {
			style: {
				display: "flex",
				height: "100%",
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				backgroundImage: "linear-gradient(to top, #cffafe, #ffffff)",
				letterSpacing: -1,
				textAlign: "center",
				color: "black",
			},
			children: [
				jsx(
					"div",
					{
						style: {
							fontSize: 48,
						},
						children: title,
					},
					"title",
				),
				jsx(
					"div",
					{
						style: {
							fontSize: 32,
						},
						children: summary,
					},
					"summary",
				),
			],
		}),
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Inter",
					data: fontData,
					weight: 400,
					style: "normal",
				},
			],
		},
	);

	return sharp(Buffer.from(svg)).png().toBuffer();
}
