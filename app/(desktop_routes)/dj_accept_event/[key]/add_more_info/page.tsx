/** @format */

import React from "react";
import AddAccountLinks from "@desk/AddAccountLinks";

function page({ params }: { params: { key: string } }) {
	return (
		<AddAccountLinks paramsType="dj" paramsKey={params.key} forDjEventInvite />
	);
}

export default page;
