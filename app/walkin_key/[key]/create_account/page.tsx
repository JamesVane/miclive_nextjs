/** @format */

import React from "react";
import CodeWalkinCreateAccount from "@mobi/Performer/CodeWalkin/CodeWalkinCreateAccount";

function page({ params }: { params: { key: string } }) {
	return <CodeWalkinCreateAccount key={params.key} />;
}

export default page;
