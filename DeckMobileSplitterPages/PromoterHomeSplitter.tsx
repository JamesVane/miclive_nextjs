/** @format */

"use client";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
const PromoterHome = dynamic(() => import("@desk/PromoterHome"), {
	ssr: false,
});
import MobilePromoterHome from "@mobi/Promoter/PromoterHome";

function PromoterHomeSplitter() {
	return <>{isMobile ? <MobilePromoterHome /> : <PromoterHome />}</>;
}

export default PromoterHomeSplitter;
