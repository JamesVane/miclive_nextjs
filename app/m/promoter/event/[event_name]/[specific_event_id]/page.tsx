/** @format */

import React from "react";
import PromoterEventDatePageV2tp0Mobile from "@mobi/Promoter/PromoterEventDatePageV2tp0Mobile";

function page({
	params,
}: {
	params: { event_name: string; specific_event_id: string };
}) {
	return (
		<PromoterEventDatePageV2tp0Mobile
			eventNamefromParams={params.event_name}
			specificEventIdFromParams={params.specific_event_id}
		/>
	);
}

export default page;
