/** @format */

"use client";
import { isMobile } from "react-device-detect";
import AcceptDateCreateAccountContainer from "@desk/performer_dj_promoter/dj/DjAcceptInvite/AcceptDateCreateAccountContainer";
import MobileDjAcceptDateCreateAccountContainer from "@mobi/DjAcceptInvite/DjAcceptDateCreateAccountContainer";

interface DjAcceptDateCreateAccountSplitterProps {
	paramsKey: string;
}

function DjAcceptDateCreateAccountSplitter({
	paramsKey,
}: DjAcceptDateCreateAccountSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileDjAcceptDateCreateAccountContainer paramsKey={paramsKey} />
			) : (
				<AcceptDateCreateAccountContainer paramsKey={paramsKey} />
			)}
		</>
	);
}

export default DjAcceptDateCreateAccountSplitter;
