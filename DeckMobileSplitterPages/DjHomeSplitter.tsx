/** @format */

"use client";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
const DjHome = dynamic(() => import("@desk/performer_dj_promoter/dj"), {
	ssr: false,
});
import MobileDjHome from "@mobi/Dj/DjHome";

function DjHomeSplitter() {
	return <>{isMobile ? <MobileDjHome /> : <DjHome />}</>;
}

export default DjHomeSplitter;
