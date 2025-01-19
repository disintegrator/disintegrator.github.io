import fs from "node:fs/promises";
import { jsx } from "react/jsx-runtime";
import satori from "satori";
import sharp from "sharp";

const regularFont = await fs.readFile(
	"./public/fonts/InterDisplay-Regular.otf",
);
const boldFont = await fs.readFile("./public/fonts/InterDisplay-Bold.otf");

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
				backgroundImage: "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
				letterSpacing: -1,
				textAlign: "center",
				color: "black",
			},
			children: [
				jsx(
					"div",
					{
						style: {
							backgroundImage:
								"linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)",
							backgroundClip: "text",
							color: "transparent",
							fontSize: 48,
							fontWeight: "bold",
							marginBottom: "16px",
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
					data: regularFont,
					weight: 400,
					style: "normal",
				},
				{
					name: "Inter",
					data: boldFont,
					weight: 700,
					style: "normal",
				},
			],
		},
	);

	return sharp(Buffer.from(svg)).png().toBuffer();
}
