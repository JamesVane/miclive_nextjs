/** @format */

import React from "react";
import ConfirmPhoneAndEmail from "@mobi/StartPage/ConfirmPhoneAndEmail";

function page({ params }: { params: { key: string } }) {
	return <ConfirmPhoneAndEmail userTypeFromParams="performer" />;
}

export default page;
