/** @format */

import React from "react";
import PromoterCurrentEventNotCheckedHelper from "./PromoterCurrentEventNotCheckedHelper";
import PromoterCurrentEventCueHelper from "./PromoterCurrentEventCueHelper";
import PromoterCurrentEventPerformedHelper from "./PromoterCurrentEventPerformedHelper";

interface PromoterCurrentEventRosterProps {
	selectedTab: "not checked" | "cue" | "performed";
}

function PromoterCurrentEventRoster({
	selectedTab,
}: PromoterCurrentEventRosterProps) {
	return (
		<div>
			{selectedTab === "not checked" ? (
				<PromoterCurrentEventNotCheckedHelper />
			) : selectedTab === "cue" ? (
				<PromoterCurrentEventCueHelper />
			) : selectedTab === "performed" ? (
				<PromoterCurrentEventPerformedHelper />
			) : null}
		</div>
	);
}

export default PromoterCurrentEventRoster;
