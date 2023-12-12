/** @format */

import React from "react";
import dynamic from "next/dynamic";
const DjHome = dynamic(() => import("@desk/performer_dj_promoter/dj"), {
	ssr: false,
});

function page() {
	return <DjHome />;
}

export default page;
