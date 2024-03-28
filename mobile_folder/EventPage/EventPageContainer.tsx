/** @format */
"use client";

import EventPage from "./EventPage";
import { EventPageDataType } from "@desk/NewEventPage/NewEventPageReducer";

interface EventPageContainerProps {
	eventData: EventPageDataType;
}

function EventPageContainer({ eventData }: EventPageContainerProps) {
	return (
		<EventPage
			AuthEventPageData={eventData}
			authStatus={
				eventData.pageState.pageState === "performer auth"
					? "performer auth"
					: "not performer"
			}
		/>
	);
}

export default EventPageContainer;
