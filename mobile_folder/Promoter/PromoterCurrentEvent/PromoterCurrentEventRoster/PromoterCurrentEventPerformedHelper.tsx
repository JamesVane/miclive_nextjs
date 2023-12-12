/** @format */

import React from "react";
import PromoterCurrentEventPerformedPaper from "./PromoterCurrentEventPerformedPaper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function PromoterCurrentEventPerformedHelper() {
	const { roster } = useSelector(
		(state: RootState) => state.PromoterManageEventState
	);
	const hasPerformedRoseter = roster.has_performed;

	return (
		<>
			{Object.entries(hasPerformedRoseter).map((performer) => {
				return (
					<PromoterCurrentEventPerformedPaper
						key={performer[0]}
						performerObject={performer[1]}
					/>
				);
			})}
		</>
	);
}

export default PromoterCurrentEventPerformedHelper;
