/** @format */

"use client";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
const PromoterCreateEvent = dynamic(
	() => import("@desk/performer_dj_promoter/promoter/PromoterCreateEventSub"),
	{
		ssr: false,
	}
);
const MobilePromoterCreateEvent = dynamic(
	() => import("@mobi/Promoter/PromoterCreateEvent"),
	{
		ssr: false,
	}
);

function PromoterCreateEventSplitter() {
	return (
		<>{isMobile ? <MobilePromoterCreateEvent /> : <PromoterCreateEvent />}</>
	);
}

export default PromoterCreateEventSplitter;
