/** @format */

import React from "react";
import PromoterEventDateRosterPapaer from "./PromoterEventDateRosterPapaer";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector } from "react-redux";

function PromoterEventDatePageRosterListHelper() {
	const RosterArray = useSelector(
		(state: RootState) => state.promoterDateInfoV2pt0Slice.roster
	);

	return (
		<>
			{RosterArray.map((performer) => (
				<PromoterEventDateRosterPapaer
					key={performer.performer_id}
					performerObj={performer}
				/>
			))}
		</>
	);
}

export default PromoterEventDatePageRosterListHelper;
