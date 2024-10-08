/** @format */
"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	ConfirmationNumberRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { DateType } from "../NewEventPage/NewEventPageReducer";
import {
	formatDateStringShort,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import DividerH from "@/universalComponents/DividerH";

interface NewEventDatePaperProps {
	dateInfo: DateType;
	eventName: string;
}

function NewEventDatePaper({ dateInfo, eventName }: NewEventDatePaperProps) {
	const router = useRouter();

	const [viewportSize, setViewportSize] = useState<"large" | "medium">("large");
	const [isHovering, setIsHovering] = useState(false);

	const iconStyles = {
		marginLeft: "4px",
		marginRight: "4px",
		height: "30px",
		width: "30px",
	};

	useEffect(() => {
		function handleResize() {
			const newWidth = window.innerWidth >= 1485 ? "large" : "medium";
			setViewportSize(newWidth);
		}

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	function handleClick() {
		const nameSlug = eventName.trim().replace(/\s+/g, "").toLowerCase();
		if (dateInfo.performer_has_ticket) {
			router.push(`/event/${nameSlug}/${dateInfo.specific_event_id}/ticket`);
		} else {
			router.push(`/event/${nameSlug}/${dateInfo.specific_event_id}`);
		}
	}

	return (
		<div
			className={styles.date_paper}
			style={{
				backgroundColor: isHovering
					? "rgba(39, 39, 39, 1)"
					: "rgba(39, 39, 39, 0.8)",
				marginTop: dateInfo.performer_has_ticket
					? isHovering
						? "25px"
						: "10px"
					: "10px",
			}}
			onClick={handleClick}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			{dateInfo.performer_has_ticket ? (
				<div
					className={styles.has_ticket_row}
					style={{
						top: isHovering ? "-15px" : "0px",
					}}>
					<div
						className={styles.has_ticket_inner}
						style={{
							backgroundColor: isHovering
								? "rgba(39, 39, 39, 1)"
								: "rgba(39, 39, 39, 0.0)",
						}}>
						<ConfirmationNumberRounded
							sx={{
								marginLeft: "6px",
								marginRight: "6px",
								height: "20x",
								width: "20px",
							}}
						/>
						{isHovering ? "Purchased Ticket" : null}
					</div>
				</div>
			) : null}
			{viewportSize === "large" ? (
				<div className={styles.date_row_long}>
					<div className={styles.date_time_split}>
						<CalendarMonthRounded sx={iconStyles} />
						{formatDateStringShort(dateInfo.start_time)}
					</div>
					<div
						className={styles.date_time_split}
						style={{ marginLeft: "-10px" }}>
						<AccessTimeRounded sx={iconStyles} />
						{`${formatTimeHour(dateInfo.start_time)} - ${formatTimeHour(
							dateInfo.end_time
						)}`}
					</div>
				</div>
			) : (
				<>
					<div className={styles.date_row_long}>
						<CalendarMonthRounded sx={iconStyles} />
						{formatDateStringShort(dateInfo.start_time)}
					</div>
					<div className={styles.date_row_long}>
						<AccessTimeRounded sx={iconStyles} />
						{`${formatTimeHour(dateInfo.start_time)} - ${formatTimeHour(
							dateInfo.end_time
						)}`}
					</div>
				</>
			)}
			<DividerH />
			<div className={styles.date_row_long}>
				<LocationOnRounded sx={iconStyles} />
				<div className={styles.elipse_text}>{dateInfo.location.name}</div>
			</div>
		</div>
	);
}

export default NewEventDatePaper;
