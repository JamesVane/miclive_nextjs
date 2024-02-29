/** @format */

import React from "react";
import PromoterCurrentEventCuePaper from "./PromoterCurrentEventCuePaper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";

function PromoterCurrentEventCueHelper() {
	const { roster } = useSelector(
		(state: RootState) => state.PromoterManageEventState
	);
	const cueRoster = roster.checked_in;

	return (
		<>
			{Object.entries(cueRoster).map((performer, index) => {
				return (
					<PromoterCurrentEventCuePaper
						performerObject={performer[1]}
						key={performer[0]}
						cueIndex={index + 1}
					/>
				);
			})}
		</>
	);
}

export default PromoterCurrentEventCueHelper;
