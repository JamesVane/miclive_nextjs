/** @format */

import React from "react";
import AddInitialAccountInfo from "@mobi/StartPage/AddInitialAccountInfo";

function page({ params }: { params: { uuid: string } }) {
	return <AddInitialAccountInfo userTypeFromParams="performer" />;
}

export default page;
