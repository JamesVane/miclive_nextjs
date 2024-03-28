/** @format */

"use client";
import { isMobile } from "react-device-detect";
import PromoterBaseEventPageV2pt0 from "@desk/performer_dj_promoter/promoter/PromoterBaseEventPageV2pt0";
import MobilePromoterEventPageV2pt0 from "@mobi/Promoter/PromoterEventPageV2pt0Mobile";

interface PromoterEventPageSplitterProps {
	eventName: string;
}

function PromoterEventPageSplitter({
	eventName,
}: PromoterEventPageSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobilePromoterEventPageV2pt0 eventNameFromParams={eventName} />
			) : (
				<PromoterBaseEventPageV2pt0 paramsEventName={eventName} />
			)}
		</>
	);
}

export default PromoterEventPageSplitter;
