/** @format */

import React from "react";
import SignInPage from "@mobi/StartPage/SignInPage";

function page({ params }: { params: { key: string; event_name: string } }) {
	return (
		<SignInPage
			eventNameFromParams={params.event_name}
			keyFromParams={params.key}
			isForPurchase
		/>
	);
}

export default page;
