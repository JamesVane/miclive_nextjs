/** @format */

import React from "react";
import ViewPromoterProfilePage from "@desk/ViewPromoterProfilePage";

function page({ params }: { params: { promoter_name: string } }) {
	return (
		<ViewPromoterProfilePage promoterNameFromParams={params.promoter_name} />
	);
}

export default page;
