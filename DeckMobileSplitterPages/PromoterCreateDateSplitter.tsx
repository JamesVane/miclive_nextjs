/** @format */

"use client";
import { isMobile } from "react-device-detect";
import PromoterCreateSpecificEventDate from "@desk/performer_dj_promoter/promoter/PromoterCreateSpecificEventDate";
import MobilePromoterCreateSpecificEventDate from "@mobi/Promoter/PromoterCreateSpecificEventDateMobile";

interface PromoterCreateDateSplitterProps {
	baseEventIdFromParams: string;
}

function PromoterCreateDateSplitter({
	baseEventIdFromParams,
}: PromoterCreateDateSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobilePromoterCreateSpecificEventDate
					baseEventIdFromParams={baseEventIdFromParams}
				/>
			) : (
				<PromoterCreateSpecificEventDate
					baseEventIdFromParams={baseEventIdFromParams}
				/>
			)}
		</>
	);
}

export default PromoterCreateDateSplitter;
