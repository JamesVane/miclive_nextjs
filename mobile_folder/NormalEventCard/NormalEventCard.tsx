/** @format */

import React from "react";
import styles from "./styles.module.css";
import SkeletonOrImage from "@/SkeletonOrImage";
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
			router.push(`/m/promoter/event/${adjustEventName(eventName)}`);
		} else if (isForDj) {
			router.push(`/m/dj/event_page/${baseEventId}`);
		} else {
			router.push(`/m/event/${adjustEventName(eventName)}`);
		}
	}

	return (
		<div className={styles.main_div} onClick={handleClick}>
			<SkeletonOrImage type="event4X1" id={baseEventId} />
			<div className={styles.filter_div}>
				<div className={styles.top_div}>
					<SkeletonOrImage type="event4X1" id={baseEventId} />
				</div>
				<div className={styles.bottom_div}>
					<div className={styles.pic_div}>
						<div className={styles.pic_deco}>
							<SkeletonOrImage type="event" id={baseEventId} />
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
