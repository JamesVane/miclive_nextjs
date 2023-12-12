/** @format */

import React from "react";
import CreateAccount from "@mobi/StartPage/CreateAccount";

function page({ params }: { params: { key: string; event_name: string } }) {
	return (
		<CreateAccount
			userTypeFromParams="performer"
			eventNameFromParams={params.event_name}
			keyFromParams={params.key}
			isForPurchase
		/>
	);
}

export default page;
