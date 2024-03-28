/** @format */

"use client";
import React from "react";
import PublicProfilePage from "./PublicProfilePage";
import PublicProfileMobile from "./PublicProfileMobile";
import { isMobile } from "react-device-detect";

function PublicProfilePageContainer() {
	return <>{isMobile ? <PublicProfileMobile /> : <PublicProfilePage />}</>;
}

export default PublicProfilePageContainer;
