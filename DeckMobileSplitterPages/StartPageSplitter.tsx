/** @format */

"use client";
import React from "react";
import StartPage from "@desk/StartPage/StartPage";
import MobileStartPage from "@mobi/StartPage";
import { isMobile } from "react-device-detect";

function StartPageSplitter() {
	return <>{isMobile ? <MobileStartPage /> : <StartPage />}</>;
}

export default StartPageSplitter;
