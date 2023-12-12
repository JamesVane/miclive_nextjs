/** @format */

import React from "react";
import dynamic from "next/dynamic";
const PromoterCreateEventSub = dynamic(
	() => import("@desk/performer_dj_promoter/promoter/PromoterCreateEventSub"),
	{
		ssr: false,
	}
);

function page() {
	return <PromoterCreateEventSub />;
}

export default page;
