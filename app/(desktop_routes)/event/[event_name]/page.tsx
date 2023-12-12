/** @format */

import React from "react";
import NewEventPage from "@desk/NewEventPage";
import type { Metadata, ResolvingMetadata } from "next";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";

/* type Props = {
	params: { event_name: string };
	searchParams: { [key: string]: string | string[] | undefined };
}; */

/* export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	try {
		// fetch data
		// const signedUrl = await getSignedUrl(`event`, "88");

		return {
			title: "Speakeasy Open Mic",
			openGraph: {
				images: [
					"https://yt3.googleusercontent.com/JfcqVinxsIc8dYsPIrp6IBDRMBb420BqVd2bzS9wqcMWBTzmnjUJ74Q0VByY1gUA8p-AYZQzxQ=s176-c-k-c0x00ffffff-no-rj",
				],
			},
		};
	} catch (error) {
		return {
			title: "Not Found",
			description: "The page you are looking for does not exist",
		};
	} 
} */
/* 
export const metadata: Metadata = {
	title: "MIC.LIVE",
	description: "DESC",
}; */

/* export const metadata: Metadata = {
	title: "TITLE!!!!!!",
	description: "DESC",
	openGraph: {
		description: "OG DESC!!!!!!",
		title: "OG TITLE!!!!!!",
	},
}; */

function page({ params }: { params: { event_name: string } }) {
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
			<meta property="og:title" content="Social Title for Cool Page" />{" "}
			<NewEventPage eventNameFromParams={params.event_name} />
		</>
	);
}

export default page;
