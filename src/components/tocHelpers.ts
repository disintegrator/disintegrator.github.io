import type { MarkdownHeading } from "astro";

export interface TocItem extends MarkdownHeading {
	children: TocItem[];
}

function diveChildren(item: TocItem, depth: number): TocItem[] {
	if (depth === 1) {
		return item.children;
	} else {
		const nextLevel = item.children[item.children.length - 1];
		if (!nextLevel) {
			throw new Error("There should be at least one child.");
		}
		return diveChildren(nextLevel, depth - 1);
	}
}

export function generateTableOfContents(headings: MarkdownHeading[]) {
	headings = [
		{ depth: 2, slug: "", text: "Back to top" },
		...headings.filter(({ depth }) => depth > 1 && depth < 4),
	];

	const [first, ...rest] = headings;
	if (!first) {
		return [];
	}

	const toc: Array<TocItem> = [{ ...first, children: [] }];
	for (const heading of rest) {
		const lastItemInToc = toc[toc.length - 1];
		if (!lastItemInToc) {
			throw new Error("There should be at least one item in table of contents");
		}

		if (heading.depth < lastItemInToc.depth) {
			throw new Error(`Orphan heading found: ${heading.text}.`);
		}

		if (heading.depth === lastItemInToc.depth) {
			// same depth
			toc.push({
				...heading,
				children: [],
			});
		} else {
			// higher depth
			// push into children, or children' children alike
			const gap = heading.depth - lastItemInToc.depth;
			const target = diveChildren(lastItemInToc, gap);
			target.push({
				...heading,
				children: [],
			});
		}
	}

	return toc;
}
