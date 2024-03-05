/** @format */

import React from "react";
import WalkinAccountNamePhoneContainer from "@mobi/WalkInAccountCreation/WalkinAccountNamePhone/WalkinAccountNamePhoneContainer";

interface QRWalkinCreateAccountPerformerProps {
	uuid: string;
}

function QRWalkinCreateAccountPerformer({
	uuid,
}: QRWalkinCreateAccountPerformerProps) {
	return (
		<WalkinAccountNamePhoneContainer
			cancelPath={`/m/checkinqr/${uuid}`}
			continuePath={`/m/checkinqr/${uuid}/confirm`}
		/>
	);
}

export default QRWalkinCreateAccountPerformer;
