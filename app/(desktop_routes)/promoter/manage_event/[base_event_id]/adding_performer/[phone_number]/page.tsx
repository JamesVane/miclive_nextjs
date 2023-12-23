/** @format */

import React from "react";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";
import ConfirmTempModal from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop/ConfirmTempModal";

function page({
	params,
}: {
	params: { base_event_id: string; phone_number: string };
}) {
	return (
		<>
			<ConfirmTempModal
				phoneNumber={params.phone_number}
				baseEventId={Number(params.base_event_id)}
			/>
			<PromoterManageEventDesktop />
		</>
	);
}

export default page;
