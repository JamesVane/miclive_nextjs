/** @format */

"use client";
import { isMobile } from "react-device-detect";
import DjAcceptInvite from "@desk/performer_dj_promoter/dj/DjAcceptInvite";
import MobileDjAcceptInvite from "@mobi/DjAcceptInvite";

interface DjAcceptDateSignInSplitterProps {
	inviteUuid: string;
}

function DjAcceptDateSplitter({ inviteUuid }: DjAcceptDateSignInSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileDjAcceptInvite inviteUuidFromParams={inviteUuid} />
			) : (
				<DjAcceptInvite inviteUuid={inviteUuid} />
			)}
		</>
	);
}

export default DjAcceptDateSplitter;
