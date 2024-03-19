/** @format */
import { useState } from "react";
import styles from "./styles.module.css";
import { Paper, Divider } from "@mui/material";
import {
	LocationOnRounded,
	AccessTimeRounded,
	CalendarMonthRounded,
	HomeRounded,
	AudioFileRounded,
	MusicOffRounded,
	VisibilityRounded,
} from "@mui/icons-material";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import { useRouter } from "next/navigation";
import { setModalNumberIsDj } from "@/store/DjEventDateListV2pt0Slice";
import { useDispatch } from "react-redux";

interface EventDateGridSquareProps {
	eventName: string;
	startTime: number;
	endTime: number;
	location: { name: string; cords: { lat: number; lng: number } };
	specificEventId: number;
	baseEventId: number;
	IsUpcoming: boolean;
	hasAudio?: boolean;
	forDj?: boolean;
	isPrimaryDj?: boolean;
}

function EventDateGridSquare({
	eventName,
	startTime,
	endTime,
	location,
	specificEventId,
	baseEventId,
	IsUpcoming,
	hasAudio,
	forDj,
	isPrimaryDj,
}: EventDateGridSquareProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const [isHovering, setIsHovering] = useState(false);

	const iconStyles = {
		marginRight: "5px",
		height: "26px",
		width: "26px",
	};

	function handleClick() {
		if (forDj) {
			dispatch(setModalNumberIsDj(specificEventId));
		} else {
			router.push(`/performer/${specificEventId}`);
		}
	}

	const dontDhowDj = forDj && !isPrimaryDj;
	const dontShowPerformer = !forDj && !IsUpcoming;

	return (
		<Paper
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className={styles.main_paper}
			style={{ cursor: "pointer" }}
			onClick={handleClick}>
			<div className={styles.hover_div}>
				<VisibilityRounded sx={{ height: "45px", width: "45px" }} />
			</div>
			{dontDhowDj || dontShowPerformer ? null : (
				<div
					className={styles.icon_absolute}
					style={{
						paddingLeft: isHovering ? "2.5px" : "0px",
						color: hasAudio
							? "#66bb69ff"
							: isPrimaryDj
							? "#66bb69ff"
							: "#ff0000ff",
						backgroundColor: isHovering ? "#0f0f0fff" : "transparent",
						width: isHovering ? "auto" : "25px",
					}}>
					{forDj ? (
						<>
							{isHovering ? "Primary DJ" : ""}
							<HomeRounded
								color="success"
								sx={{
									height: "25px",
									width: "25px",
								}}
							/>
						</>
					) : (
						<>
							{hasAudio ? (
								<>
									{isHovering ? "Audio Submitted" : ""}
									<AudioFileRounded
										color="success"
										sx={{
											height: "25px",
											width: "25px",
										}}
									/>
								</>
							) : (
								<>
									{isHovering ? "No Audio" : ""}
									<MusicOffRounded
										color="error"
										sx={{
											height: "25px",
											width: "25px",
										}}
									/>
								</>
							)}
						</>
					)}
				</div>
			)}
			<div className={styles.top_div}>
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
				<div className={styles.name_div}>
					<div className={styles.name_overflow}>{eventName}</div>
				</div>
			</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
			<div
				className={styles.date_location_div}
				style={{
					color: IsUpcoming ? "#888661ff" : "grey",
				}}>
				<CalendarMonthRounded sx={iconStyles} />
				{formatDateString(startTime)}
			</div>
			<div
				className={styles.date_location_div}
				style={{
					color: IsUpcoming ? "#888661ff" : "grey",
				}}>
				<AccessTimeRounded sx={iconStyles} />
				{`${formatTimeHour(startTime)} - ${formatTimeHour(endTime)}`}
			</div>
			<div
				className={styles.date_location_div}
				style={{
					color: IsUpcoming ? "#888661ff" : "grey",
				}}>
				<LocationOnRounded sx={iconStyles} />
				<div className={styles.overflow_div}>{location.name}</div>
			</div>
		</Paper>
	);
}

export default EventDateGridSquare;

export function EmptyDateGridSquare() {
	return <Paper className={styles.main_paper} style={{ opacity: "0" }} />;
}
