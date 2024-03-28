/** @format */
"use client";
import { isMobile } from "react-device-detect";
import NewEventPage from "@desk/NewEventPage";
import MobileEventPage from "@mobi/EventPage";
import { EventPageDataType } from "@desk/NewEventPage/NewEventPageReducer";

interface BaseEventPageSplitterProps {
	eventPageData: EventPageDataType;
}

function BaseEventPageSplitter({ eventPageData }: BaseEventPageSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileEventPage eventData={eventPageData} />
			) : (
				<NewEventPage eventPageData={eventPageData} />
			)}
		</>
	);
}

export default BaseEventPageSplitter;
