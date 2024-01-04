/** @format */

import React from "react";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";

function page({ params }: { params: { specific_event_id: string } }) {
	return (
		<PromoterManageEventDesktop specificEventId={params.specific_event_id} />
	);
}

export default page;
