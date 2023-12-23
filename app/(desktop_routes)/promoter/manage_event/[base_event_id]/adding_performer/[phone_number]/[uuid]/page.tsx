/** @format */

import React from "react";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";
import AddWalkinDataModal from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop/AddWalkinDataModal";

async function page({
	params,
}: {
	params: { base_event_id: string; phone_number: string; uuid: string };
}) {
	return (
		<>
			<AddWalkinDataModal
				phoneNumber={params.phone_number}
				uuidCode={params.uuid}
				specificEventId={Number(params.base_event_id)}
			/>
			{/* <PromoterManageEventDesktop /> */}
		</>
	);
}

export default page;
