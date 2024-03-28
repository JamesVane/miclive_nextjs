/** @format */

import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

interface NormalEventCardProps {
	eventName: string;
	eventTalgine: string;
	baseEventId: number;
	isForPromoter?: boolean;
	isForDj?: boolean;
}

function NormalEventCard({
	eventName,
	eventTalgine,
	baseEventId,
	isForPromoter,
	isForDj,
}: NormalEventCardProps) {
	const router = useRouter();

	function adjustEventName(eventName: string): string {
		return eventName.replace(/\s/g, "").toLowerCase();
	}

	function handleClick() {
		if (isForPromoter) {
			router.push(`/promoter/event/${adjustEventName(eventName)}`);
		} else if (isForDj) {
			router.push(`/dj/event_page/${baseEventId}`);
		} else {
			router.push(`/event/${adjustEventName(eventName)}`);
		}
	}

	return (
		<div className={styles.main_div} onClick={handleClick}>
			<img
				src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_4X1/banner_${baseEventId}`}
				style={{ height: "100%", width: "100%" }}
			/>
			<div className={styles.filter_div}>
				<div className={styles.top_div}>
					<img
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_4X1/banner_${baseEventId}`}
						style={{ height: "100%", width: "100%" }}
					/>
				</div>
				<div className={styles.bottom_div}>
					<div className={styles.pic_div}>
						<div className={styles.pic_deco}>
							<img
								src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${baseEventId}.jpg`}
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
					</div>
					<div className={styles.right_div}>
						<div className={styles.name_div}>{eventName}</div>
						<div className={styles.tagline_div}>{eventTalgine}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NormalEventCard;
