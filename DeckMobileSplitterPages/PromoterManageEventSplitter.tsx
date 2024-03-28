/** @format */

"use client";
import { isMobile } from "react-device-detect";
import PromoterManageEventDesktop from "@desk/performer_dj_promoter/promoter/PromoterManageEventDesktop";
import MobilePromoterCurrentEvent from "@mobi/Promoter/PromoterCurrentEvent";

interface PromoterManageEventSplitterProps {
	specificEventId: string;
}

function PromoterManageEventSplitter({
	specificEventId,
}: PromoterManageEventSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobilePromoterCurrentEvent
					specificEventIdFromParams={specificEventId}
				/>
			) : (
				<PromoterManageEventDesktop specificEventId={specificEventId} />
			)}
		</>
	);
}

export default PromoterManageEventSplitter;
