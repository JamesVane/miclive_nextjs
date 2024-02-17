/** @format */

import styles from "./styles.module.css";
import { VisibilityRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface EventGridSquareProps {
	eventName: string;
	eventTagline: string;
	baseEventId: number;
	isForPromoter?: boolean;
	isForDj?: boolean;
}

function EventGridSquare({
	eventName,
	eventTagline,
	baseEventId,
	isForPromoter,
	isForDj,
}: EventGridSquareProps) {
	const router = useRouter();

	function adjustEventName(eventName: string): string {
		return eventName.replace(/\s/g, "").toLowerCase();
	}

	function handleClick() {
		if (isForPromoter) {
			router.push(`/promoter/event/${adjustEventName(eventName)}`);
		} else if (isForDj) {
			router.push(`/dj/event/${baseEventId}`);
		} else {
			router.push(`/event/${adjustEventName(eventName)}`);
		}
	}

	return (
		<div className={styles.main_paper} onClick={handleClick}>
			<div className={styles.eye_overlay}>
				<div className={styles.banner_top}>
					<VisibilityRounded sx={{ height: "50px", width: "50px" }} />
				</div>
			</div>
			<div className={styles.absolute_pic}>
				<img
					src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${baseEventId}`}
					style={{ height: "100%", width: "100%" }}
				/>
			</div>
			<div className={styles.overlay_div}>
				<div className={styles.banner_top}>
					<img
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${baseEventId}`}
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
					<div className={styles.name_and_tagline}>
						<div className={styles.event_name}>{eventName}</div>
						<div className={styles.tagline_div}>{eventTagline}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventGridSquare;

export function EmptyEventGridSquare() {
	return (
		<div
			className={styles.main_paper}
			style={{ opacity: "0", cursor: "default" }}
		/>
	);
}
