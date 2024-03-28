/** @format */

import React from "react";
import DjEventPageMobile from "@mobi/Dj/DjEventPageMobile";

function page({ params }: { params: { base_event_id: string } }) {
	return <DjEventPageMobile baseEventIdFromParams={params.base_event_id} />;
}

export default page;
