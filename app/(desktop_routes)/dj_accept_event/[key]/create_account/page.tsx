/** @format */

import React from "react";
import CreateAccount from "@desk/CreateAccount";

function page({ params }: { params: { key: string } }) {
	return <CreateAccount userType="dj" />;
}

export default page;
