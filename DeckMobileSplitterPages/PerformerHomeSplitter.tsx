/** @format */

"use client";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
const PerformerHome = dynamic(
	() => import("@desk/performer_dj_promoter/performer/PerformerHome"),
	{
		ssr: false,
	}
);
import MobilePerformerHome from "@mobi/Performer/PerformerHome";

function PerformerHomeSplitter() {
	return <>{isMobile ? <MobilePerformerHome /> : <PerformerHome />}</>;
}

export default PerformerHomeSplitter;
