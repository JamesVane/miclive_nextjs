/** @format */

import React, { useState, useEffect, useMemo } from "react";
import { EmptyDateGridSquare } from "@desk/EventDateGridSquare/EventDateGridSquare";
import EventDateGridSquare from "@desk/EventDateGridSquare";
import styles from "./styles.module.css";
import { DjTicketEvent } from "../../../../api_functions/getDjEventDateList";

interface DjEventDateListProps {
	upcomingArray: DjTicketEvent[];
	previousArray: DjTicketEvent[];
}

function DjEventDateList({
	upcomingArray,
	previousArray,
}: DjEventDateListProps) {
	const [viewportWidth, setViewportWidth] = useState<"four" | "three" | "two">(
		"four"
	);

	console.log("upcomingArray: ", upcomingArray);

	const chunkedUpcomingArray = useMemo(() => {
		const chunkSize =
			viewportWidth === "four" ? 4 : viewportWidth === "three" ? 3 : 2;
		const chunks: (DjTicketEvent | "empty_slot")[][] = [];
		for (let i = 0; i < upcomingArray.length; i += chunkSize) {
			const chunk: (DjTicketEvent | "empty_slot")[] = upcomingArray.slice(
				i,
				i + chunkSize
			);
			while (chunk.length < chunkSize) {
				chunk.push("empty_slot");
			}
			chunks.push(chunk);
		}
		return chunks;
	}, [upcomingArray, viewportWidth]);

	const chunkedPreviousArray = useMemo(() => {
		const chunkSize =
			viewportWidth === "four" ? 4 : viewportWidth === "three" ? 3 : 2;
		const chunks = [] as (DjTicketEvent | "empty_slot")[][];
		for (let i = 0; i < previousArray.length; i += chunkSize) {
			const chunk: (DjTicketEvent | "empty_slot")[] = previousArray.slice(
				i,
				i + chunkSize
			);
			while (chunk.length < chunkSize) {
				chunk.push("empty_slot");
			}
			chunks.push(chunk);
		}
		return chunks;
	}, [previousArray, viewportWidth]);

	useEffect(() => {
		function handleResize() {
			window.innerWidth < 811
				? setViewportWidth("two")
				: window.innerWidth < 1201
				? setViewportWidth("three")
				: setViewportWidth("four");
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className={styles.main_div}>
			{upcomingArray.length === 0 ? null : (
				<>
					<div className={styles.upcoming_previous_div}>
						<div className={styles.upcoming_text}>Upcoming Event Dates</div>
						<div className={styles.upcoming_bar}></div>
					</div>

					<>
						{chunkedUpcomingArray.map((chunk, index) => (
							<div key={index} className={styles.row_div}>
								{chunk.map((event) => (
									<>
										{event === "empty_slot" ? (
											<EmptyDateGridSquare />
										) : (
											<EventDateGridSquare
												forDj
												IsUpcoming={true}
												baseEventId={event.base_event_id}
												eventName={event.event_name}
												startTime={event.start_time}
												endTime={event.end_time}
												location={event.location}
												specificEventId={event.specific_event_id}
												key={event.specific_event_id}
												isPrimaryDj={event.is_primary_dj}
											/>
										)}
									</>
								))}
							</div>
						))}
					</>
				</>
			)}
			{previousArray.length === 0 ? null : (
				<>
					<div className={styles.upcoming_previous_div}>
						<div className={styles.previous_text}>Previous Event Dates</div>
						<div className={styles.previous_bar}></div>
					</div>
					<>
						{chunkedPreviousArray.map((chunk, index) => (
							<div key={index} className={styles.row_div}>
								<>
									{chunk.map((event) => (
										<>
											{event === "empty_slot" ? (
												<EmptyDateGridSquare />
											) : (
												<EventDateGridSquare
													forDj
													IsUpcoming={false}
													baseEventId={event.base_event_id}
													eventName={event.event_name}
													startTime={event.start_time}
													endTime={event.end_time}
													location={event.location}
													specificEventId={event.specific_event_id}
													key={event.specific_event_id}
													isPrimaryDj={event.is_primary_dj}
												/>
											)}
										</>
									))}
								</>
							</div>
						))}
					</>
				</>
			)}
		</div>
	);
}

export default DjEventDateList;
