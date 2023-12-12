/** @format */

import React from "react";
import EventGridSquare from "@desk/EventGridSquare";
import { EmptyEventGridSquare } from "@desk/EventGridSquare/EventGridSquare";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { EventObject } from "@/api_functions/getPromoterPreviewPageDataV2pt0";

interface PromoterProfileGridSquareHelperProps {
	eventsArray: EventObject[];
}

function PromoterProfileGridSquareHelper({
	eventsArray,
}: PromoterProfileGridSquareHelperProps) {
	const [viewportWidth, setViewportWidth] = useState<"three" | "two">("three");

	useEffect(() => {
		function handleResize() {
			window.innerWidth < 1057
				? setViewportWidth("two")
				: setViewportWidth("three");
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	function chunkArrayByThree(followingArray: EventObject[]) {
		const chunkedArray = [] as (EventObject | "empty_slot")[][];
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

	function chunkArrayByTwo(followingArray: EventObject[]) {
		const chunkedArray = [] as (EventObject | "empty_slot")[][];
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
			? chunkArrayByThree(eventsArray)
			: chunkArrayByTwo(eventsArray);

	return (
		<>
			{chunkedArray.map((chunk, index) => {
				return (
					<div className={styles.event_row_div} key={index}>
						{chunk.map((event) => {
							return (
								<>
									{event === "empty_slot" ? (
										<EmptyEventGridSquare />
									) : (
										<EventGridSquare
											eventName={event.event_name}
											eventTagline={event.event_tagline}
											baseEventId={Number(event.base_event_id)}
											key={event.base_event_id}
										/>
									)}
								</>
							);
						})}
					</div>
				);
			})}
		</>
	);
}

export default PromoterProfileGridSquareHelper;
