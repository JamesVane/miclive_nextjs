/** @format */

import React from "react";
import CreateAccount from "@desk/CreateAccount";

function page({ params }: { params: { key: string } }) {
	return <CreateAccount userType="dj" keyParam={params.key} forDjEventInvite />;
}

export default page;
