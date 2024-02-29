/** @format */

import React from "react";
import PromoterCurrentEventNotCheckedPaper from "./PromoterCurrentEventNotCheckedPaper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";

function PromoterCurrentEventNotCheckedHelper() {
	const { roster } = useSelector(
		(state: RootState) => state.PromoterManageEventState
	);

	const notCheckedRoster = roster.not_checked_in;

	return (
		<>
			{notCheckedRoster.map((performer) => (
				<PromoterCurrentEventNotCheckedPaper
					performerObject={performer}
					key={performer.performer_id}
				/>
			))}
		</>
	);
}

export default PromoterCurrentEventNotCheckedHelper;
