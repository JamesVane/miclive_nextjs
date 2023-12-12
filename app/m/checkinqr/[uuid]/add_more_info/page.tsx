/** @format */

import React from "react";
import AddAccountLinks from "@mobi/StartPage/AddAccountLinks";

function page({ params }: { params: { uuid: string } }) {
	return (
		<AddAccountLinks
			userTypeFromParams="performer"
			uuidFromParams={params.uuid}
			forPerformerQr
		/>
	);
}

export default page;
