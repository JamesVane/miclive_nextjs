/** @format */

import React from "react";
import PromoterPreview from "@mobi/PromoterPreview";

function page({ params }: { params: { promoter_name: string } }) {
	return <PromoterPreview promoterNameFromParams={params.promoter_name} />;
}

export default page;
