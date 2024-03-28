/** @format */

import React from "react";
import QRWalkinCreateAccountPerformer from "@mobi/Performer/CheckInQr/QRWalkinCreateAccountPerformer";

function page({ params }: { params: { uuid: string } }) {
	return <QRWalkinCreateAccountPerformer uuid={params.uuid} />;
}

export default page;
