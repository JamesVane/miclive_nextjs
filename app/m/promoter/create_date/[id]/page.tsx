/** @format */

import React from "react";
import PromoterCreateSpecificEventDateMobile from "@mobi/Promoter/PromoterCreateSpecificEventDateMobile";

function page({ params }: { params: { id: string } }) {
	return (
		<PromoterCreateSpecificEventDateMobile baseEventIdFromParams={params.id} />
	);
}

export default page;
