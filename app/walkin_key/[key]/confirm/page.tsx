/** @format */

import React from "react";
import CodeWalkinConfirmPhone from "@mobi/Performer/CodeWalkin/CodeWalkinConfirmPhone";

function page({ params }: { params: { key: string } }) {
	return <CodeWalkinConfirmPhone key={params.key} />;
}

export default page;
