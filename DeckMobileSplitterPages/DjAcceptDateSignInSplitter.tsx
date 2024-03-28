/** @format */

"use client";
import { isMobile } from "react-device-detect";
import DjAcceptInvite from "@desk/performer_dj_promoter/dj/DjAcceptInvite";
import MobileDjAcceptInvite from "@mobi/DjAcceptInvite";

interface DjAcceptDateSignInSplitterProps {
	inviteUuid: string;
}

function DjAcceptDateSignInSplitter({
	inviteUuid,
}: DjAcceptDateSignInSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileDjAcceptInvite isSigningIn inviteUuidFromParams={inviteUuid} />
			) : (
				<DjAcceptInvite isSigningIn inviteUuid={inviteUuid} />
			)}
		</>
	);
}

export default DjAcceptDateSignInSplitter;
