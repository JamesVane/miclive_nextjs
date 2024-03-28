/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, Divider } from "@mui/material";
import {
	DateRangeRounded,
	AttachMoneyRounded,
	LocationCityRounded,
} from "@mui/icons-material";

function EventDateProfileCard() {
	return (
		<div className={styles.event_section_paper}>
			<div className={styles.event_section_top}>
				<div className={styles.event_pic}>
					<div className={styles.event_pic_inner}>
						<img
							style={{
								height: "100%",
								width: "100%",
								objectFit: "cover",
							}}
							src={
								"https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_106.jpg"
							}
						/>
					</div>
				</div>
				<div className={styles.event_section_top_right}>speakeasy open mic</div>
			</div>
			<div className={styles.divider_div}>
				<Divider flexItem />
			</div>
			<div className={styles.event_section_date_loc}>
				<DateRangeRounded
					sx={{
						height: "22px",
						width: "22px",
						marginRight: "3px",
						marginTop: "-3px",
						marginLeft: "3px",
					}}
				/>
				Sun, Mar 30th
				<LocationCityRounded
					sx={{
						height: "22px",
						width: "22px",
						marginRight: "3px",
						marginTop: "-3px",
						marginLeft: "10px",
					}}
				/>
				Dallas TX.
			</div>
			<div className={styles.event_section_bottom}>
				<Button
					startIcon={<AttachMoneyRounded />}
					color="success"
					variant="contained">
					buy ticket with affiliate link
				</Button>
			</div>
		</div>
	);
}

export default EventDateProfileCard;
