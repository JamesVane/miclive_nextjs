/** @format */

import type { Metadata, ResolvingMetadata } from "next";

/* export const metadata: Metadata = {
	title: "MIC.LIVE",
	description: "DESC",
}; */

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<meta
				name="title"
				content="Next.js 13 - Layouts and Pages Explained in 20 mins or so"
			/>
			<meta property="og:title" content="Social Title for Cool Page" />
			<main>{children}</main>
		</>
	);
}
