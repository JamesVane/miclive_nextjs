/** @format */

import React from "react";
import PromoterEditEvent from "@mobi/Promoter/PromoterEditEvent";

function page({ params }: { params: { event_name: string } }) {
	return <PromoterEditEvent eventNameFromParams={params.event_name} />;
}

export default page;
