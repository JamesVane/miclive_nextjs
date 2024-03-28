/** @format */

"use client";
import { isMobile } from "react-device-detect";
import SignInPage from "@desk/SignIn";
import MobileSignInPage from "@mobi/StartPage/SignInPage";

function SignInSplitter() {
	return <>{isMobile ? <MobileSignInPage /> : <SignInPage />}</>;
}

export default SignInSplitter;
