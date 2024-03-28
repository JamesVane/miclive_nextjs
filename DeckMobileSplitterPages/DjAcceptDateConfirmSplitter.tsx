/** @format */

"use client";
import { isMobile } from "react-device-detect";
import DjAcceptDateConfirmContainer from "@desk/performer_dj_promoter/dj/DjAcceptInvite/DjAcceptDateConfirmContainer";
import MobileDjAcceptDateConfirmContainer from "@mobi/DjAcceptInvite/DjAcceptDateConfirmContainer";

interface DjAcceptDateConfirmSplitterProps {
	paramsKey: string;
}

function DjAcceptDateConfirmSplitter({
	paramsKey,
}: DjAcceptDateConfirmSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileDjAcceptDateConfirmContainer paramsKey={paramsKey} />
			) : (
				<DjAcceptDateConfirmContainer paramsKey={paramsKey} />
			)}
		</>
	);
}

export default DjAcceptDateConfirmSplitter;
