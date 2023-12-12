/** @format */

import React from "react";
import CreateAccount from "@mobi/StartPage/CreateAccount";

function page({ params }: { params: { key: string } }) {
	return (
		<CreateAccount
			userTypeFromParams="performer"
			keyFromParams={params.key}
			forPerformerKeyCheckin
		/>
	);
}

export default page;
