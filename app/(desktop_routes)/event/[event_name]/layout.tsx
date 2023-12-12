/** @format */
"use client";

import type { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";

/* export const metadata: Metadata = {
	title: "TITLE!!!!!!",
	description: "DESC",
    openGraph: {
        description: "OG DESC!!!!!!",
        title: "OG TITLE!!!!!!",
    }
};  */

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
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

			<main>{children}</main>
		</>
	);
}
