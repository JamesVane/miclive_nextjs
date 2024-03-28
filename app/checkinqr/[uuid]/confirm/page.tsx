/** @format */

import React from "react";
import QRWalkinConfirmPhone from "@mobi/Performer/CheckInQr/QRWalkinConfirmPhone";

function page({ params }: { params: { uuid: string } }) {
	return <QRWalkinConfirmPhone uuid={params.uuid} />;
}

export default page;
