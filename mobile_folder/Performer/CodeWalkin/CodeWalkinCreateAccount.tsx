/** @format */

import React from "react";
import WalkinAccountNamePhoneContainer from "@mobi/WalkInAccountCreation/WalkinAccountNamePhone/WalkinAccountNamePhoneContainer";

interface CodeWalkinCreateAccountProps {
	key: string;
}

function CodeWalkinCreateAccount({ key }: CodeWalkinCreateAccountProps) {
	return (
		<WalkinAccountNamePhoneContainer
			cancelPath={`/walkin_key/${key}`}
			continuePath={`/walkin_key/${key}/confirm`}
		/>
	);
}

export default CodeWalkinCreateAccount;
