/** @format */

import React from "react";
import PerformerQrLanding from "@mobi/Performer/PerformerQrLanding";

function page({ params }: { params: { uuid: string } }) {
	return <PerformerQrLanding uuidFromParams={params.uuid} />;
}

export default page;
