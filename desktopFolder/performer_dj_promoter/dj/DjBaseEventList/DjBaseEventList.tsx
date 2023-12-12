/** @format */

import React from "react";
import { DjPrimaryEvent } from "../../../../api_functions/getDjPrimaryEventsV2pt0";
import styles from "./styles.module.css";
import EventGridSquare from "@desk/EventGridSquare";
import { EmptyEventGridSquare } from "@desk/EventGridSquare/EventGridSquare";

interface DjBaseEventListPrrops {
	eventArray: DjPrimaryEvent[];
	viewportWidth: "three" | "two";
}

function DjBaseEventList({ eventArray, viewportWidth }: DjBaseEventListPrrops) {
	function chunkArrayByThree(followingArray: DjPrimaryEvent[]) {
		const chunkedArray = [] as (DjPrimaryEvent | "empty_slot")[][];
		let index = 0;
		while (index < followingArray.length) {
			chunkedArray.push(followingArray.slice(index, index + 3));
			index += 3;
		}
		if (chunkedArray.length > 0) {
			const lastChunk = chunkedArray[chunkedArray.length - 1];
			if (lastChunk.length === 1) {
				lastChunk.push("empty_slot");
				lastChunk.push("empty_slot");
			} else if (lastChunk.length === 2) {
				lastChunk.push("empty_slot");
			}
		}
		return chunkedArray;
	}

	function chunkArrayByTwo(followingArray: DjPrimaryEvent[]) {
		const chunkedArray = [] as (DjPrimaryEvent | "empty_slot")[][];
		let index = 0;
		while (index < followingArray.length) {
			chunkedArray.push(followingArray.slice(index, index + 2));
			index += 2;
		}
		if (chunkedArray.length > 0) {
			const lastChunk = chunkedArray[chunkedArray.length - 1];
			if (lastChunk.length === 1) {
				lastChunk.push("empty_slot");
			}
		}
		return chunkedArray;
	}

	const chunkedArray =
		viewportWidth === "three"
			? chunkArrayByThree(eventArray)
			: chunkArrayByTwo(eventArray);

	return (
		<div className={styles.main_div}>
			{chunkedArray.map((chunk, index) => {
				return (
					<div className={styles.row_div} key={index}>
						{chunk.map((event) => {
							return (
								<>
									{event === "empty_slot" ? (
										<EmptyEventGridSquare />
									) : (
										<EventGridSquare
											isForDj
											eventName={event.event_name}
											eventTagline={event.event_tagline}
											baseEventId={event.base_event_id}
											key={event.base_event_id}
										/>
									)}
								</>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

export default DjBaseEventList;
