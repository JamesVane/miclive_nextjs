/** @format */

import React from "react";
import AddInitialAccountInfo from "@desk/AddInitialAccountInfo";

function page({ params }: { params: { key: string } }) {
	return (
		<AddInitialAccountInfo
			paramsType="dj"
			paramsKey={params.key}
			forDjEventInvite
		/>
	);
}

export default page;
