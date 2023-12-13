/** @format */

import React from "react";
import NewEventPage from "@desk/NewEventPage";

function page({
	params,
}: {
	params: { event_name: string; specific_event_id: string };
}) {
	return {
		/* <NewEventPage
			specificIdfromParams={params.specific_event_id}
			eventNameFromParams={params.event_name}
			dateOpen
		/> */
	};
}

export default page;
