/** @format */

import React from "react";
import PerformerTicketsPageDesktop from "./PerformerTicketsPageDesktop";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootStore";

function PerformerTicketsPageDesktopContainer() {
	const { upcoming: upcomingArray, previous: previousArray } = useSelector(
		(state: RootState) => state.performerTicketsV2pt0
	);

	return (
		<PerformerTicketsPageDesktop
			upcomingArray={upcomingArray}
			previousArray={previousArray}
		/>
	);
}

export default PerformerTicketsPageDesktopContainer;
