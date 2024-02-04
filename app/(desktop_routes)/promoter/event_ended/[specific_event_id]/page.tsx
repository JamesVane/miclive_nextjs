/** @format */

import React from "react";

function page({ params }: { params: { specific_event_id: string } }) {
	return <div>event has eneded {params.specific_event_id}</div>;
}

export default page;
