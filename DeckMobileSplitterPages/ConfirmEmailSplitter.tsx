/** @format */

"use client";
import React from "react";
import { isMobile } from "react-device-detect";
import ConfirmEmail from "@desk/ConfirmEmail";
import MobileConfirmEmail from "@mobi/ConfirmEmail";

function ConfirmEmailSplitter() {
	return <>{isMobile ? <MobileConfirmEmail /> : <ConfirmEmail />}</>;
}

export default ConfirmEmailSplitter;
