/** @format */

import React from "react";
import CreateAccount from "@mobi/StartPage/CreateAccount";

function page({ params }: { params: { key: string; event_name: string } }) {
	return <CreateAccount userTypeFromParams="performer" />;
}

export default page;
