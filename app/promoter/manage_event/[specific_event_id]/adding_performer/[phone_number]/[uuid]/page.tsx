/** @format */

import React from "react";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";
import AddWalkinDataModal from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop/AddWalkinDataModal";

async function page({
	params,
}: {
	params: { specific_event_id: string; phone_number: string; uuid: string };
}) {
	return (
		<>
			<AddWalkinDataModal
				phoneNumber={params.phone_number}
				uuidCode={params.uuid}
				specificEventId={Number(params.specific_event_id)}
			/>
			<PromoterManageEventDesktop specificEventId={params.specific_event_id} />
		</>
	);
}

export default page;
