/** @format */

import React from "react";
import dynamic from "next/dynamic";
const PromoterHome = dynamic(() => import("@desk/PromoterHome"), {
	ssr: false,
});

function page() {
	return <PromoterHome />;
}

export default page;
