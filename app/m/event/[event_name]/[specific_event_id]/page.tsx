/** @format */

import React from "react";
import EventDatePage from "@mobi/EventDatePage";

function page({
	params,
}: {
	params: { event_name: string; specific_event_id: string };
}) {
	return (
		<EventDatePage
			isFromEventPage
			specificEventIdFromParams={params.specific_event_id}
		/>
	);
}

export default page;
