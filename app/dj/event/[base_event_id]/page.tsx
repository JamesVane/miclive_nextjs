/** @format */

import React from "react";
import DjEventPageV2pt0 from "@desk/performer_dj_promoter/dj/DjEventPageV2pt0";

function page({ params }: { params: { base_event_id: string } }) {
	return <DjEventPageV2pt0 baseEventIdFromParams={params.base_event_id} />;
}

export default page;
