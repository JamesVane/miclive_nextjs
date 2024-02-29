/** @format */

import React from "react";
import DjEventDateList from "./DjEventDateList";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import DjEventDateModal from "../DjEventDateModal";
import styles from "./styles.module.css";

function DjEventDateListContainer() {
	const { upcoming_array: upcomingArray, previous_array: previousArray } =
		useSelector((state: RootState) => state.DjEventDateListV2pt0Slice.datesObj);

	const selectedDate = useSelector(
		(state: RootState) => state.DjEventDateListV2pt0Slice.modalIsOpen
	);

	return (
		<>
			{upcomingArray.length === 0 && previousArray.length === 0 ? (
				<div className={styles.no_events}>
					<div className={styles.no_events_row}>You Are Not The DJ</div>
					<div className={styles.no_events_row}>For Any Event Dates Yet.</div>
				</div>
			) : (
				<>
					{selectedDate ? (
						<DjEventDateModal selectedDate={selectedDate} />
					) : null}
					<DjEventDateList
						upcomingArray={upcomingArray}
						previousArray={previousArray}
					/>
				</>
			)}
		</>
	);
}

export default DjEventDateListContainer;
