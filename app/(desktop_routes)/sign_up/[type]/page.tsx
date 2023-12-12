/** @format */
"use client";

import React from "react";
import CreateAccountContainer from "@desk/CreateAccount";

function page({
	params,
}: {
	params: { type: "promoter" | "performer" | "dj" };
}) {
	return <CreateAccountContainer userType={params.type} />;
}

export default page;
