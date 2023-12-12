/** @format */

import React from "react";
import PerformerCurrentEvent from "@mobi/Performer/PerformerCurrentEvent";

function page({ params }: { params: { id: string; event_name: string } }) {
	return (
		<PerformerCurrentEvent
			specificEventIdFromParams={params.id}
			eventNameFromParams={params.event_name}
		/>
	);
}

export default page;
