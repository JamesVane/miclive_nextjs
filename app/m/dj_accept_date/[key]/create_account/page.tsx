/** @format */

import React from "react";
import CreateAccount from "@mobi/StartPage/CreateAccount";

function page({ params }: { params: { key: string } }) {
	return <CreateAccount userTypeFromParams="dj" />;
}

export default page;
