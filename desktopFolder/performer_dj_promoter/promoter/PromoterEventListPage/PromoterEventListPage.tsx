/** @format */

import React from "react";
import { EventData } from "@/api_functions/getPromoterEventListV2pt0";
import styles from "./styles.module.css";
import EventGridSquare from "@desk/EventGridSquare";
import { EmptyEventGridSquare } from "@desk/EventGridSquare/EventGridSquare";
import { Button } from "@mui/material";
import { AddBoxRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface PromoterEventListPageProps {
	viewportWidth: "three" | "two";
	eventListArray: EventData[];
}

function PromoterEventListPage({
	viewportWidth,
	eventListArray,
}: PromoterEventListPageProps) {
	const router = useRouter();
	function chunkArrayByThree(eventListArray: EventData[]) {
		const chunkedArray = [] as (EventData | "empty_slot")[][];
		let index = 0;
		while (index < eventListArray.length) {
			chunkedArray.push(eventListArray.slice(index, index + 3));
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

	function chunkArrayByTwo(eventListArray: EventData[]) {
		const chunkedArray = [] as (EventData | "empty_slot")[][];
		let index = 0;
		while (index < eventListArray.length) {
			chunkedArray.push(eventListArray.slice(index, index + 2));
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
			? chunkArrayByThree(eventListArray)
			: chunkArrayByTwo(eventListArray);

	function handleCreateEvent() {
		router.push("/promoter/create");
	}

	return (
		<div className={styles.main_div}>
			{eventListArray.length === 0 ? (
				<div className={styles.no_events_div}>
					You have not created any events yet.
					<Button
						sx={{
							marginTop: "10px",
						}}
						size="large"
						onClick={handleCreateEvent}
						startIcon={<AddBoxRounded />}
						variant="outlined"
						color="success">
						create event
					</Button>
				</div>
			) : null}
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
											isForPromoter
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

export default PromoterEventListPage;
