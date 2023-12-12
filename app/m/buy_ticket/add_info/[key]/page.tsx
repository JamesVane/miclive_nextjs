/** @format */

import React from "react";
import AddInitialAccountInfo from "@mobi/StartPage/AddInitialAccountInfo";

function page({ params }: { params: { key: string } }) {
	return (
		<AddInitialAccountInfo
			userTypeFromParams="performer"
			keyFromParams={params.key}
			isForPurchase
		/>
	);
}

export default page;
