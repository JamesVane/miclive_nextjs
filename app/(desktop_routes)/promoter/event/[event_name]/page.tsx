/** @format */

import React from "react";
import PromoterBaseEventPageV2pt0 from "@desk/performer_dj_promoter/promoter/PromoterBaseEventPageV2pt0";

function page({ params }: { params: { event_name: string } }) {
	return <PromoterBaseEventPageV2pt0 paramsEventName={params.event_name} />;
}

export default page;
