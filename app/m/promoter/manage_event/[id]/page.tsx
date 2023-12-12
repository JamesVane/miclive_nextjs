/** @format */

import React from "react";
import PromoterCurrentEvent from "@mobi/Promoter/PromoterCurrentEvent";

function page({ params }: { params: { id: string } }) {
	return <PromoterCurrentEvent specificEventIdFromParams={params.id} />;
}

export default page;
