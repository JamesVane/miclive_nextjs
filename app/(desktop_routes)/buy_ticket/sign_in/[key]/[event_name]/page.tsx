/** @format */

import React from "react";
import SignInPage from "@desk/SignIn";

function page({ params }: { params: { key: string; event_name: string } }) {
	return (
		<SignInPage
			isForPurchase
			keyFromParams={params.key}
			eventNameFromParams={params.event_name}
		/>
	);
}

export default page;
