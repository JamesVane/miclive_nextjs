/** @format */

import React from "react";
import PromotProventPageV2pt0Mobile from "@mobi/Promoter/PromoterEventPageV2pt0Mobile";

function page({ params }: { params: { event_name: string } }) {
	return (
		<PromotProventPageV2pt0Mobile eventNameFromParams={params.event_name} />
	);
}

export default page;
