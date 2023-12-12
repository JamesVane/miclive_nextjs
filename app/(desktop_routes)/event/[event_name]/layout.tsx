/** @format */

import type { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";

/* export const metadata: Metadata = {
	title: "MIC.LIVE",
	description: "DESC",
}; */

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Head>
				<title>foofoo</title>
				<meta
					name="title"
					content="Next.js 13 - Layouts and Pages Explained in 20 mins or so"
				/>
				<meta
					property="og:description"
					content="And a social description for our cool page"
				/>
				<meta property="og:title" content="Social Title for Cool Page" />
			</Head>

			<main>{children}</main>
		</>
	);
}
