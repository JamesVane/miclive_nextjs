/** @format */

import React from "react";
import CreateAccount from "@desk/CreateAccount";

function page({ params }: { params: { key: string; event_name: string } }) {
	return (
		<CreateAccount
			userType="performer"
			eventNameParam={params.event_name}
			keyParam={params.key}
			isForPurchase
		/>
	);
}

export default page;
