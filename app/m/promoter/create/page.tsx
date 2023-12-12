/** @format */

import React from "react";
import dynamic from "next/dynamic";
const PromoterCreateEvent = dynamic(
	() => import("@mobi/Promoter/PromoterCreateEvent"),
	{
		ssr: false,
	}
);

function page() {
	return <PromoterCreateEvent />;
}

export default page;
