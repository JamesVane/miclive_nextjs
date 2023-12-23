/** @format */

import React from "react";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";
import AddPerformerModal from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop/AddPerformerModal";

function page({ params }: { params: { base_event_id: string } }) {
	return (
		<>
			<AddPerformerModal baseEventId={Number(params.base_event_id)} />
			<PromoterManageEventDesktop />
		</>
	);
}

export default page;
