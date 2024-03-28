/** @format */

import React from "react";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";
import ConfirmTempModal from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop/ConfirmTempModal";

function page({
	params,
}: {
	params: { specific_event_id: string; phone_number: string };
}) {
	return (
		<>
			<ConfirmTempModal
				phoneNumber={params.phone_number}
				baseEventId={Number(params.specific_event_id)}
			/>
			<PromoterManageEventDesktop specificEventId={params.specific_event_id} />
		</>
	);
}

export default page;
