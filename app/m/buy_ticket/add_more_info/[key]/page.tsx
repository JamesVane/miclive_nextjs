/** @format */

import React from "react";
import AddAccountLinks from "@mobi/StartPage/AddAccountLinks";

function page({ params }: { params: { key: string } }) {
	return (
		<AddAccountLinks
			userTypeFromParams="performer"
			keyFromParams={params.key}
			isForPurchase
		/>
	);
}

export default page;
