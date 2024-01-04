/** @format */

import React from "react";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";
import AddPerformerModal from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop/AddPerformerModal";

function page({ params }: { params: { specific_event_id: string } }) {
	return (
		<>
			<AddPerformerModal baseEventId={Number(params.specific_event_id)} />
			<PromoterManageEventDesktop specificEventId={params.specific_event_id} />
		</>
	);
}

export default page;
