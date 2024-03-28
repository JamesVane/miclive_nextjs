/** @format */

import React from "react";
import PerformerHome from "@desk/performer_dj_promoter/performer/PerformerHome";

function page({ params }: { params: { specific_event_id: string } }) {
	return (
		<PerformerHome dateOpened openSpecificEventId={params.specific_event_id} />
	);
}

export default page;
