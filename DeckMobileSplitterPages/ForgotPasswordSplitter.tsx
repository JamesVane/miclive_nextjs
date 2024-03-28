/** @format */

"use client";
import { isMobile } from "react-device-detect";
import ForgotPasswordPage from "@desk/ForgotPasswordPage";
import MobileForgotPasswordPage from "@mobi/StartPage/ForgotPasswordPage";

function ForgotPasswordSplitter() {
	return (
		<>{isMobile ? <MobileForgotPasswordPage /> : <ForgotPasswordPage />}</>
	);
}

export default ForgotPasswordSplitter;
