/** @format */

"use client";
import React from "react";
import { isMobile } from "react-device-detect";
import MobileAddInitialAccountInfo from "@mobi/StartPage/AddInitialAccountInfo";
import AddInitialAccountInfo from "@desk/AddInitialAccountInfo";

interface AddInfoSplitterProps {
	paramsType: "promoter" | "performer" | "dj";
}

function AddInfoSplitter({ paramsType }: AddInfoSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileAddInitialAccountInfo userTypeFromParams={paramsType} />
			) : (
				<AddInitialAccountInfo paramsType={paramsType} />
			)}
		</>
	);
}

export default AddInfoSplitter;
