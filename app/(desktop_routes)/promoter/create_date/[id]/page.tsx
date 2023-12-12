/** @format */

import React from "react";
import PromoterCreateSpecificEventDate from "@desk/performer_dj_promoter/promoter/PromoterCreateSpecificEventDate";

function page({ params }: { params: { id: string } }) {
	return <PromoterCreateSpecificEventDate baseEventIdFromParams={params.id} />;
}

export default page;
