/** @format */

import React from "react";
import CreateAccount from "@desk/CreateAccount";

function page({ params }: { params: { key: string } }) {
	return <CreateAccount keyParam={params.key} userType="dj" forDjDateInvite />;
}

export default page;
