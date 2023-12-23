/** @format */

import React from "react";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";

function page({ params }: { params: { base_event_id: string } }) {
	return <PromoterManageEventDesktop />;
}

export default page;
