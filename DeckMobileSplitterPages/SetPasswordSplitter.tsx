/** @format */

"use client";
import { isMobile } from "react-device-detect";
import ForgotPasswordPage from "@desk/ForgotPasswordPage";
import MobileForgotPasswordPage from "@mobi/StartPage/ForgotPasswordPage";

function SetPasswordSplitter() {
	return (
		<>
			{isMobile ? (
				<MobileForgotPasswordPage settingFromNoPassword />
			) : (
				<ForgotPasswordPage settingFromNoPassword />
			)}
		</>
	);
}

export default SetPasswordSplitter;
