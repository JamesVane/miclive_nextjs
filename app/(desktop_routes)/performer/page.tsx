/** @format */

import React from "react";
import dynamic from "next/dynamic";
const PerformerHome = dynamic(
	() => import("@desk/performer_dj_promoter/performer/PerformerHome"),
	{
		ssr: false,
	}
);

function page() {
	return <PerformerHome />;
}

export default page;
