/** @format */

import { useState, useEffect } from "react";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
} from "@mui/icons-material";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import { Divider } from "@mui/material";
import styles from "./styles.module.css";
import { setSelectedSpecificEvent } from "@/store/PromoterEventPageV2pt0Slice";
import { useDispatch } from "react-redux";
import { DateType } from "@/store/PromoterEventPageV2pt0Slice";

interface PromoterDatePaperProps {
	dateInfo: DateType;
}

function PromoterDatePaper({ dateInfo }: PromoterDatePaperProps) {
	const dispatch = useDispatch();

	const [viewportSize, setViewportSize] = useState<"large" | "medium">("large");
	const [isHovering, setIsHovering] = useState(false);

	const iconStyles = {
		marginLeft: "4px",
		marginRight: "4px",
		height: "23px",
		width: "23px",
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
		dispatch(setSelectedSpecificEvent(dateInfo.specific_event_id));
	}

	return (
		<div
			className={styles.date_paper}
			style={{
				backgroundColor: isHovering
					? "rgba(39, 39, 39, 1)"
					: "rgba(39, 39, 39, 0.8)",
				marginTop: "10px",
			}}
			onClick={handleClick}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			{viewportSize === "large" ? (
				<div className={styles.date_row_long}>
					<div className={styles.date_time_split} style={{ width: "55%" }}>
						<CalendarMonthRounded sx={iconStyles} />
						{formatDateString(dateInfo.start_time)}
					</div>
					<div
						className={styles.date_time_split}
						style={{ marginLeft: "-10px", width: "45%" }}>
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

export default PromoterDatePaper;
