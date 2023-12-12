/** @format */

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Divider } from "@mui/material";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
	AlbumRounded,
} from "@mui/icons-material";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import {
	setModalNumberIsDj,
	setModalNumberNotDj,
} from "@/store/DjEventDateListV2pt0Slice";
import { DjDateType } from "@/api_functions/getDjEventPageDataV2pt0";
import { useDispatch } from "react-redux";

interface DjEventPageDatePaperProps {
	dateInfo: DjDateType;
}

function DjEventPageDatePaper({ dateInfo }: DjEventPageDatePaperProps) {
	const dispatch = useDispatch();

	const iconStyles = {
		marginLeft: "4px",
		marginRight: "4px",
		height: "30px",
		width: "30px",
	};

	const [viewportSize, setViewportSize] = useState<"large" | "medium">("large");
	const [isHovering, setIsHovering] = useState(false);

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
		if (dateInfo.is_dj_for_event) {
			dispatch(setModalNumberIsDj(dateInfo.specific_event_id));
		} else {
			dispatch(setModalNumberNotDj(dateInfo.specific_event_id));
		}
	}

	return (
		<div
			className={styles.date_paper}
			style={{
				backgroundColor: isHovering
					? "rgba(39, 39, 39, 1)"
					: "rgba(39, 39, 39, 0.8)",
				marginTop: dateInfo.is_dj_for_event
					? isHovering
						? "25px"
						: "10px"
					: "10px",
			}}
			onClick={handleClick}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			{dateInfo.is_dj_for_event ? (
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
						<AlbumRounded
							sx={{
								marginLeft: "6px",
								marginRight: "6px",
								height: "20x",
								width: "20px",
							}}
						/>
						{isHovering ? "My Event" : null}
					</div>
				</div>
			) : null}
			{viewportSize === "large" ? (
				<div className={styles.date_row_long}>
					<div className={styles.date_time_split}>
						<CalendarMonthRounded sx={iconStyles} />
						{formatDateString(dateInfo.start_time)}
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
						{formatDateString(dateInfo.start_time)}
					</div>
					<div className={styles.date_row_long}>
						<AccessTimeRounded sx={iconStyles} />
						{`${formatTimeHour(dateInfo.start_time)} - ${formatTimeHour(
							dateInfo.end_time
						)}`}
					</div>
				</>
			)}
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
			<div className={styles.date_row_long}>
				<LocationOnRounded sx={iconStyles} />
				<div className={styles.elipse_text}>{dateInfo.location.name}</div>
			</div>
		</div>
	);
}

export default DjEventPageDatePaper;
