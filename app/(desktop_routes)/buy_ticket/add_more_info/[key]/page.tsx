/** @format */

import React from "react";
import AddAccountLinks from "@desk/AddAccountLinks";

function page({ params }: { params: { key: string } }) {
	return (
		<AddAccountLinks
			paramsType="performer"
			paramsKey={params.key}
			isForPurchase
		/>
	);
}

export default page;
