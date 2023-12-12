/** @format */
import EventPage from "@mobi/EventPage";

import React from "react";

function page({ params }: { params: { event_name: string } }) {
	return <EventPage eventNameFromParams={params.event_name} />;
}

export default page;
