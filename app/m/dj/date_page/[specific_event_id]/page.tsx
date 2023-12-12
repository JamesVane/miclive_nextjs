/** @format */

import React from "react";
import DjDatePage from "@mobi/Dj/DjDatePage";

function page({ params }: { params: { specific_event_id: string } }) {
	return <DjDatePage specificEventIdFromParams={params.specific_event_id} />;
}

export default page;
