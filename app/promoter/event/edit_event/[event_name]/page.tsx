/** @format */

import React from "react";
import PromoterEditBaseEvent from "@mobi/Promoter/PromoterEditBaseEvent";

function page({ params }: { params: { event_name: string } }) {
	return <PromoterEditBaseEvent />;
}

export default page;
