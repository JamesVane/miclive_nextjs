/** @format */

import React from "react";
import NewEventPage from "@desk/NewEventPage";
import type { Metadata, ResolvingMetadata } from "next";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";

type Props = {
	params: { event_name: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: "TITLE!!!!!!",
		description: "DESC",
		openGraph: {
			description: "OG DESC!!!!!!",
			title: "OG TITLE!!!!!!",
		},
	};
}

/* export const metadata: Metadata = {
	title: "TITLE!!!!!!",
	description: "DESC",
	openGraph: {
		description: "OG DESC!!!!!!",
		title: "OG TITLE!!!!!!",
	},
}; */

function page({ params }: { params: { event_name: string } }) {
	return <NewEventPage eventNameFromParams={params.event_name} />;
}

export default page;
