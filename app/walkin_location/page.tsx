/** @format */

import React from "react";
import dynamic from "next/dynamic";
const WalkInLocation = dynamic(
	() => import("@mobi/WalkInCheckIn/WalkInLocation"),
	{
		ssr: false,
	}
);

function page() {
	return <WalkInLocation />;
}

export default page;
