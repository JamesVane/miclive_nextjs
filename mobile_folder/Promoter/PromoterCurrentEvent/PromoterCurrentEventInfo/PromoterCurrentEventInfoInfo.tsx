/** @format */

import styles from "./styles.module.css";
import { Avatar } from "@mui/material";
import {
	AttachMoneyRounded,
	ConfirmationNumberRounded,
	MicExternalOnRounded,
	TimerRounded,
	MusicNoteRounded,
} from "@mui/icons-material";
import { EventInfoType } from "@/store/PromoterManageEventState";
import PersonRowMobile from "@mobi/PersonRowMobile";

interface PromoterCurrentEventInfoInfoProps {
	eventInfo: EventInfoType;
}

function PromoterCurrentEventInfoInfo({
	eventInfo,
}: PromoterCurrentEventInfoInfoProps) {
	const avatarStyles = {
		height: "40px",
		width: "40px",
		backgroundColor: "rgba(0,0,0,0)",
		border: "1px solid #f8dca1ff",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const iconStyles = {
		width: "80%",
		height: "80%",
		color: "primary.main",
	};

	return (
		<div className={styles.promoter_info_info_main_div}>
			<PersonRowMobile
				info={eventInfo.dj.dj_info}
				name={eventInfo.dj.dj_name}
				roleId={eventInfo.dj.dj_id}
				tagline={eventInfo.dj.dj_tagline}
				type="dj"
				userSub={eventInfo.dj.dj_sub}
			/>
			<div className={styles.event_info_row}>
				<Avatar sx={avatarStyles}>
					<AttachMoneyRounded sx={iconStyles} />
				</Avatar>
				<div className={styles.info_text_helper}>
					<div className={styles.secondary_color}>{`Ticket Price: `}</div>
					<div className={styles.primary_color}>{eventInfo.ticket_price}$</div>
				</div>
			</div>
			<div className={styles.event_info_row}>
				<Avatar sx={avatarStyles}>
					<ConfirmationNumberRounded sx={iconStyles} />
				</Avatar>
				<div className={styles.info_text_helper}>
					<div className={styles.secondary_color}>{"Tickets for sale: "}</div>
					<div className={styles.primary_color}>
						{eventInfo.tickets_for_sale}
					</div>
					<div className={styles.secondary_color}>{" / tickets sold: "}</div>
					<div className={styles.primary_color}>
						{eventInfo.tickets_sold ? eventInfo.tickets_sold : 0}
					</div>
				</div>
			</div>
			<div className={styles.event_info_row}>
				<Avatar sx={avatarStyles}>
					<MicExternalOnRounded sx={iconStyles} />
				</Avatar>
				<div className={styles.info_text_helper}>
					<div className={styles.secondary_color}>{"Total Performers: "}</div>
					<div className={styles.primary_color}>
						{eventInfo.total_performers}
					</div>
				</div>
			</div>
			<div className={styles.event_info_row}>
				<Avatar sx={avatarStyles}>
					<TimerRounded sx={iconStyles} />
				</Avatar>
				<div className={styles.info_text_helper}>
					<div className={styles.secondary_color}>{"Time Per Performer: "}</div>
					<div className={styles.primary_color}>
						{eventInfo.time_per_performer.toString().slice(2)}
					</div>
				</div>
			</div>
			<div className={styles.event_info_row}>
				<Avatar sx={avatarStyles}>
					<MusicNoteRounded sx={iconStyles} />
				</Avatar>
				<div className={styles.info_text_helper}>
					<div className={styles.secondary_color}>
						{"Tracks per performer: "}
					</div>
					<div className={styles.primary_color}>
						{eventInfo.tracks_per_performer}
					</div>
				</div>
			</div>
			<div className={styles.promoter_info_bumper} />
		</div>
	);
}

export default PromoterCurrentEventInfoInfo;
