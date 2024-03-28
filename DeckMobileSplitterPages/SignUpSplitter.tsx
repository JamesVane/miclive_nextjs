/** @format */

"use client";
import { isMobile } from "react-device-detect";
import CreateAccountContainer from "@desk/CreateAccount";
import MobileCreateAccount from "@mobi/StartPage/CreateAccount";

interface SignUpSplitterProps {
	userType: "promoter" | "performer" | "dj";
}

function SignUpSplitter({ userType }: SignUpSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileCreateAccount userTypeFromParams={userType} />
			) : (
				<CreateAccountContainer userType={userType} />
			)}
		</>
	);
}

export default SignUpSplitter;
