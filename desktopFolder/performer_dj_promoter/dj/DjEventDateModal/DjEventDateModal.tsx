/** @format */

import styles from "./styles.module.css";
import { Divider, Button, IconButton } from "@mui/material";
import {
	CalendarMonthRounded,
	AccessTimeRounded,
	CloseRounded,
	IosShareRounded,
	LocationOnRounded,
	CancelPresentationRounded,
} from "@mui/icons-material";
import {
	formatDateString,
	formatTimeHour,
} from "../../../../generic_functions/date_formaters";
import PersonRow from "@desk/PersonRow";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import DescriptionComponent from "@desk/DescriptionComponent";
import DividerH from "@/universalComponents/DividerH";

interface DjEventDateModalProps {
	handleClose: () => void;
	isDjForDate: boolean;
	setDropDateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DjEventDateModal({
	handleClose,
	isDjForDate,
	setDropDateModalOpen,
}: DjEventDateModalProps) {
	const dateDataObj = useSelector(
		(state: RootState) => state.djEventDateModalDataV2pt0
	);

	const dateLocIconStyles = {
		marginRight: "5px",
		height: "27px",
		width: "27px",
	};

	return (
		<>
			<IconButton
				onClick={handleClose}
				sx={{
					position: "absolute",
					right: "0px",
					top: "0px",
					height: "40px",
					width: "40px",
					zIndex: "20",
				}}>
				<CloseRounded sx={{ height: "35px", width: "35px" }} />
			</IconButton>
			<div className={styles.paper_split}>
				<div className={styles.info_name_pic}>
					<div className={styles.pic_div}>
						<div className={styles.pic_deco}>
							<img
								src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${dateDataObj.base_event_id}.jpg`}
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
					</div>
					<div className={styles.event_name}>{dateDataObj.event_name}</div>
				</div>
				<DividerH />
				<div className={styles.date_loc_div}>
					<div className={styles.date_time_split}>
						<CalendarMonthRounded
							sx={{
								marginLeft: "5px",
								...dateLocIconStyles,
							}}
						/>
						{formatDateString(dateDataObj.start_time)}
					</div>
					<div className={styles.date_time_split}>
						<AccessTimeRounded sx={dateLocIconStyles} />
						{`${formatTimeHour(dateDataObj.start_time)} - ${formatTimeHour(
							dateDataObj.end_time
						)}`}
					</div>
				</div>
				<div className={styles.date_loc_div}>
					<LocationOnRounded
						sx={{
							marginLeft: "5px",
							...dateLocIconStyles,
						}}
					/>
					<div className={styles.elipse_text}>{dateDataObj.location.name}</div>
				</div>
				<DividerH />
				{dateDataObj.has_ended ? null : (
					<div className={styles.buttons_div}>
						{isDjForDate ? (
							<Button
								onClick={() => setDropDateModalOpen(true)}
								sx={{ marginLeft: "5px" }}
								startIcon={<CancelPresentationRounded />}
								variant="outlined"
								color="warning">
								resign from event date
							</Button>
						) : null}
						<Button
							sx={{ marginLeft: "5px" }}
							startIcon={<IosShareRounded />}
							variant="outlined">
							share
						</Button>
					</div>
				)}
				<div className={styles.promoter_dj_div}>
					<PersonRow
						cameFrom="performer"
						id={dateDataObj.promoter.promoter_id}
						name={dateDataObj.promoter.promoter_name}
						tagline={dateDataObj.promoter.promoter_tagline}
						userSub={dateDataObj.promoter.promoter_sub}
						promoter
						inputHeight="100px"
					/>
				</div>
				{!isDjForDate && dateDataObj.dj?.dj_id ? (
					<div className={styles.promoter_dj_div}>
						<PersonRow
							cameFrom="dj"
							id={dateDataObj.dj.dj_id}
							name={dateDataObj.dj.dj_name}
							tagline={dateDataObj.dj.dj_tagline}
							userSub={dateDataObj.dj.dj_sub}
							dj
							inputHeight="100px"
						/>
					</div>
				) : null}
				<div className={styles.desc_div}>
					<DescriptionComponent text={dateDataObj.date_description} />
				</div>
			</div>
			{isDjForDate ? (
				<div className={styles.diviider_vert}>
					<Divider orientation="vertical" variant="middle" flexItem />
				</div>
			) : null}
			{isDjForDate ? (
				<div className={styles.paper_split}>
					<div className={styles.roster_header}>Event Roster</div>
				</div>
			) : null}
		</>
	);
}

export default DjEventDateModal;
