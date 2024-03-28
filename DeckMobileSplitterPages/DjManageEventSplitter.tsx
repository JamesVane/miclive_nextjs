/** @format */

"use client";
import { isMobile } from "react-device-detect";
import DJEventManagePage from "@desk/performer_dj_promoter/dj/DJEventManagePage";
import MobileDjCurrentEvent from "@mobi/Dj/DjCurrentEvent";

interface DjManageEventSplitterProps {
	specificEventId: string;
}

function DjManageEventSplitter({
	specificEventId,
}: DjManageEventSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileDjCurrentEvent specificEventId={specificEventId} />
			) : (
				<DJEventManagePage specificEventIdFromParams={specificEventId} />
			)}
		</>
	);
}

export default DjManageEventSplitter;
