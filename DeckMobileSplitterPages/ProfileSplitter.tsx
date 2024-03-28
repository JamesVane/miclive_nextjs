/** @format */

"use client";
import React from "react";
import ProfileRootPage from "@desk/ProfileRootPage";
import MobileProfilePage from "@mobi/ProfilePage";
import { isMobile } from "react-device-detect";

function ProfileSplitter() {
	return <>{isMobile ? <MobileProfilePage /> : <ProfileRootPage />}</>;
}

export default ProfileSplitter;
