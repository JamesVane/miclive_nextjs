/** @format */

import React from "react";
import NewEventPage from "@desk/NewEventPage";
import type { Metadata, ResolvingMetadata } from "next";
import { Amplify, withSSRContext } from "aws-amplify";
import {
	eventPageReducer,
	EventPageDataType,
} from "@desk/NewEventPage/NewEventPageReducer";
import { getEventPageDataForAuthPerformer } from "@/api_functions/getEventPageDataForAuthPerformer";
import { getEventPageDataForUnauthenticatedUser } from "@/api_functions_no_auth/getEventPageDataForUnauthenticatedUser";
import awsExports from "@/aws-exports";
import { headers } from "next/headers";
import { getEventMetadata } from "@/api_functions_no_auth/getEventMetadata";
import { UAParser } from "ua-parser-js";
import MobileEventDatePage from "@mobi/EventDatePage";

type Props = {
	params: { event_name: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const eventMetadata = await getEventMetadata(params.event_name);

	return {
		title: eventMetadata.event_name,
		description: eventMetadata.event_tagline,
		openGraph: {
			description: eventMetadata.event_tagline,
			title: eventMetadata.event_name,
			url: `https://www.mic.live/event/${params.event_name}`,
			images: [
				/* {
					url: `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${eventMetadata.base_event_id}.jpg`,
					width: 1200,
					height: 1200,
				}, */
				{
					url: `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${eventMetadata.base_event_id}`,
					width: 1200,
					height: 400,
				},
			],
		},
	};
}

async function page({
	params,
}: {
	params: { event_name: string; specific_event_id: string };
}) {
	const req = {
		headers: {
			cookie: headers().get("cookie"),
		},
	};
	const SSR = withSSRContext({ req });

	const isMobileDevice = () => {
		if (typeof process === "undefined") {
			throw new Error(
				"[Server method] you are importing a server-only module outside of server"
			);
		}
		const { get } = headers();
		const ua = get("user-agent");
		const device = new UAParser(ua || "").getDevice();
		return device.type === "mobile";
	};

	const eventPageData = async (
		eventName: string
	): Promise<EventPageDataType> => {
		try {
			const currentUser = await SSR.Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			const authToken = currentUser.signInUserSession.idToken.jwtToken;
			const roleType = currentUser.attributes["custom:RoleType"];
			const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
			const followingArrayNotParsed =
				currentUser.attributes["custom:PerformerFollowing"];
			const followingArrayFromCog = followingArrayNotParsed
				? JSON.parse(followingArrayNotParsed)
				: [];

			let data;
			if (roleType === "performer" && eventName) {
				data = await getEventPageDataForAuthPerformer(eventName, authToken);
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

	const isMobile = isMobileDevice();
	const fetchedEventData = isMobile
		? null
		: await eventPageData(params.event_name);

	return (
		<>
			{!isMobile && fetchedEventData ? (
				<NewEventPage
					eventPageData={fetchedEventData}
					specificIdfromParams={params.specific_event_id}
					dateOpen
					ticketIsOpen
				/>
			) : (
				<MobileEventDatePage
					isFromTicketsPage
					eventPageTicketPurchasedDate
					specificEventIdFromParams={params.specific_event_id}
				/>
			)}
		</>
	);
}

export default page;
