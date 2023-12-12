/** @format */

import React from "react";
import dynamic from "next/dynamic";
const WalkInQr = dynamic(() => import("@mobi/WalkInCheckIn/WalkInQr"), {
	ssr: false,
});

function page() {
	return <WalkInQr />;
}

export default page;
