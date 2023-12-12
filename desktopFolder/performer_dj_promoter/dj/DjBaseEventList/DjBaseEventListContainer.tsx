/** @format */

import { useState, useEffect } from "react";
import DjBaseEventList from "./DjBaseEventList";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootStore";
import styles from "./styles.module.css";

function DjBaseEventListContainer() {
	const eventArray = useSelector(
		(state: RootState) => state.DjPrimaryEventsListV2pt0Slice
	);

	const [viewportWidth, setViewportWidth] = useState<"three" | "two">("three");

	useEffect(() => {
		function handleResize() {
			window.innerWidth < 1057
				? setViewportWidth("two")
				: setViewportWidth("three");
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			{eventArray.length === 0 ? (
				<div className={styles.no_events}>
					<div className={styles.no_events_row}>You Are Not The Primary DJ</div>
					<div className={styles.no_events_row}>For Any Events Yet.</div>
				</div>
			) : (
				<DjBaseEventList
					viewportWidth={viewportWidth}
					eventArray={eventArray}
				/>
			)}
		</>
	);
}

export default DjBaseEventListContainer;
