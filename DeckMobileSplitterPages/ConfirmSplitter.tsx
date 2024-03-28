/** @format */

"use client";
import React from "react";
import { isMobile } from "react-device-detect";
import MobileConfirmPhoneAndEmail from "@mobi/StartPage/ConfirmPhoneAndEmail";
import ConfirmPhoneAndEmail from "@desk/ConfirmPhoneAndEmail";

interface ConfirmSplitterProps {
	type: "promoter" | "performer" | "dj";
}

function ConfirmSplitter({ type }: ConfirmSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileConfirmPhoneAndEmail userTypeFromParams={type} />
			) : (
				<ConfirmPhoneAndEmail paramsType={type} />
			)}
		</>
	);
}

export default ConfirmSplitter;
