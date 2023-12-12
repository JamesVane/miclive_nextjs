/** @format */

import React from "react";
import AddInitialAccountInfo from "@mobi/StartPage/AddInitialAccountInfo";

function page({ params }: { params: { key: string } }) {
	return (
		<AddInitialAccountInfo
			userTypeFromParams="dj"
			keyFromParams={params.key}
			forDjDateInvite
		/>
	);
}

export default page;
