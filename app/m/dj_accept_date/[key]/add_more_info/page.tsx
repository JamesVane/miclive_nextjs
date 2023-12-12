/** @format */

import React from "react";
import AddAccountLinks from "@mobi/StartPage/AddAccountLinks";

function page({ params }: { params: { key: string } }) {
	return (
		<AddAccountLinks
			userTypeFromParams="dj"
			keyFromParams={params.key}
			forDjDateInvite
		/>
	);
}

export default page;
