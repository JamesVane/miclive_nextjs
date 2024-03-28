/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, Divider } from "@mui/material";
import {
	DateRangeRounded,
	AttachMoneyRounded,
	LocationCityRounded,
} from "@mui/icons-material";

function MobiledateProfilePage() {
	return (
		<div className={styles.mobile_date_container}>
			<div className={styles.mobile_date_top}>
				<div className={styles.mobile_date_image}>
					<div className={styles.mobile_date_image_deco}>
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
				Speakeasy Open Mic
			</div>
			<div className={styles.divider_div}>
				<Divider flexItem />
			</div>
			<div className={styles.mobile_date_date_loc}>
				<DateRangeRounded
					sx={{
						height: "20px",
						width: "20px",
						marginRight: "5px",
					}}
				/>
				Sun, Mar 12th
				<LocationCityRounded
					sx={{
						height: "20px",
						width: "20px",
						marginRight: "5px",
						marginLeft: "10px",
					}}
				/>
				Dallas TX.
			</div>
			<div className={styles.mobile_date_button}>
				<Button
					startIcon={<AttachMoneyRounded />}
					color="success"
					variant="contained"
					size="small">
					buy ticket with affiliate link
				</Button>
			</div>
		</div>
	);
}

export default MobiledateProfilePage;
