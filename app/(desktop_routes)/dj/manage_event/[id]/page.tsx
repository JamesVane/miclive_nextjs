/** @format */

import React from "react";
import DJEventManagePage from "@desk/performer_dj_promoter/dj/DJEventManagePage";

function page({ params }: { params: { id: string } }) {
	return <DJEventManagePage specificEventIdFromParams={params.id} />;
}

export default page;
