/** @format */

import React from "react";
import NewEventPage from "@desk/NewEventPage";
import type { Metadata, ResolvingMetadata } from "next";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	try {
		const id = params.id;

		// fetch data
		const signedUrl = await getSignedUrl(`event`, "88");

		if (signedUrl) {
			return {
				title: "Speakeasy Open Mic",
				openGraph: {
					images: [signedUrl],
				},
			};
		} else {
			return { title: "Speakeasy Open Mic" };
		}
	} catch (error) {
		return {
			title: "Not Found",
			description: "The page you are looking for does not exist",
		};
	}
}

function page({ params }: { params: { event_name: string } }) {
	return <NewEventPage eventNameFromParams={params.event_name} />;
}

export default page;
