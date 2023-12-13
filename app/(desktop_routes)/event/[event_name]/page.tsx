/** @format */

import React from "react";
import NewEventPage from "@desk/NewEventPage";
import type { Metadata, ResolvingMetadata } from "next";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { Auth } from "aws-amplify";
import {
	eventPageReducer,
	EventPageDataType,
} from "@desk/NewEventPage/NewEventPageReducer";
import { getEventPageDataForAuthPerformer } from "@/api_functions/getEventPageDataForAuthPerformer";
import { getEventPageDataForUnauthenticatedUser } from "@/api_functions/getEventPageDataForUnauthenticatedUser";

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

const eventPageData = async (eventName: string): Promise<EventPageDataType> => {
	try {
		const currentUser = await Auth.currentAuthenticatedUser({
			bypassCache: true,
		});
		const roleType = currentUser.attributes["custom:RoleType"];
		const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
		const followingArrayFromCog = JSON.parse(
			currentUser.attributes["custom:PerformerFollowing"]
		);

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

async function page({ params }: { params: { event_name: string } }) {
	const fetchedEventData = await eventPageData(params.event_name);

	return <div>foofoo</div>;
	// return <NewEventPage eventPageData={fetchedEventData} />;
}

export default page;
