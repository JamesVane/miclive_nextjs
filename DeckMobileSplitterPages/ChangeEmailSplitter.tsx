/** @format */

"use client";
import { isMobile } from "react-device-detect";
import ChangeEmail from "@desk/ChangeEmail";
import MobileChangeEmail from "@mobi/ChangeEmail";

function ChangeEmailSplitter() {
	return <>{isMobile ? <MobileChangeEmail /> : <ChangeEmail />}</>;
}

export default ChangeEmailSplitter;
