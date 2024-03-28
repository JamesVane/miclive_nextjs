/** @format */

"use client";
import { isMobile } from "react-device-detect";
import ChangePhoneNumber from "@desk/ChangePhoneNumber";
import MobileChangePhoneNumber from "@mobi/ChangePhoneNumber";

function ChangePhoneSplitter() {
	return <>{isMobile ? <MobileChangePhoneNumber /> : <ChangePhoneNumber />}</>;
}

export default ChangePhoneSplitter;
