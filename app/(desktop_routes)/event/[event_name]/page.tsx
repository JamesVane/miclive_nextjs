/** @format */

import React from "react";
import NewEventPage from "@desk/NewEventPage";
import type { Metadata, ResolvingMetadata } from "next";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { Amplify, withSSRContext } from "aws-amplify";
import {
	eventPageReducer,
	EventPageDataType,
} from "@desk/NewEventPage/NewEventPageReducer";
import { getEventPageDataForAuthPerformer } from "@/api_functions/getEventPageDataForAuthPerformer";
import { getEventPageDataForUnauthenticatedUser } from "@/api_functions/getEventPageDataForUnauthenticatedUser";
import awsExports from "@/aws-exports";
import { headers } from "next/headers";
import { getEventMetadata } from "@/api_functions/getEventMetadata";

Amplify.configure({ ...awsExports, ssr: true });

type Props = {
	params: { event_name: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const eventMetadata = await getEventMetadata(params.event_name);
	console.log("eventMetadata:", {
		metadataBase: new URL("https://mic.live"),
		title: eventMetadata.event_name,
		description: eventMetadata.event_tagline,
		openGraph: {
			description: eventMetadata.event_tagline,
			title: eventMetadata.event_name,
			url: `https://mic.live/event/${params.event_name}`,
			imagee: `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_4X1/banner_${eventMetadata.base_event_id}`,
		},
	});

	return {
		metadataBase: new URL("https://mic.live"),
		title: eventMetadata.event_name,
		description: eventMetadata.event_tagline,
		openGraph: {
			description: eventMetadata.event_tagline,
			title: eventMetadata.event_name,
			url: `https://mic.live/event/${params.event_name}`,
			images: [
				{
					url: `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_4X1/banner_${eventMetadata.base_event_id}`,
					width: 1600,
					height: 400,
				},
			],
		},
	};
}

/* {
					url: `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${eventMetadata.base_event_id}.jpg`,
					width: 1200,
					height: 1200,
				}, */

async function page({ params }: { params: { event_name: string } }) {
	const req = {
		headers: {
			cookie: headers().get("cookie"),
		},
	};
	const SSR = withSSRContext({ req });

	const eventPageData = async (
		eventName: string
	): Promise<EventPageDataType> => {
		try {
			const currentUser = await SSR.Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			const roleType = currentUser.attributes["custom:RoleType"];
			const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
			const followingArrayNotParsed =
				currentUser.attributes["custom:PerformerFollowing"];
			const followingArrayFromCog = followingArrayNotParsed
				? JSON.parse(followingArrayNotParsed)
				: [];

			let data;
			if (roleType === "performer" && eventName) {
				data = await getEventPageDataForAuthPerformer(
					eventName,
					requestPerformerRoleId
				);
			} else {
				data = await getEventPageDataForUnauthenticatedUser(eventName);
			}

			return {
				alreadyFollowing:
					roleType === "performer"
						? followingArrayFromCog.includes(
								typeof data.data.base_event_id === "number"
									? data.data.base_event_id
									: Number(data.data.base_event_id)
						  )
						: false,
				pageState: eventPageReducer(data),
			};
		} catch (error) {
			console.error(error);

			const data = await getEventPageDataForUnauthenticatedUser(eventName);
			return {
				alreadyFollowing: false,
				pageState: eventPageReducer(data),
			};
		}
	};

	const fetchedEventData = await eventPageData(params.event_name);

	return <NewEventPage eventPageData={fetchedEventData} />;
}

export default page;
