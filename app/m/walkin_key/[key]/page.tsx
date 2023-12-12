/** @format */

import React from "react";
import WalkInEventKey from "@mobi/WalkInCheckIn/WalkInEventKey";

function page({ params }: { params: { key: string } }) {
	return <WalkInEventKey ketFromParams={params.key} hasGoodKey />;
}

export default page;
