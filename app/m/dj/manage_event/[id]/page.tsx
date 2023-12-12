/** @format */

import React from "react";
import DjCurrentEvent from "@mobi/Dj/DjCurrentEvent";

function page({ params }: { params: { id: string } }) {
	return <DjCurrentEvent />;
}

export default page;
