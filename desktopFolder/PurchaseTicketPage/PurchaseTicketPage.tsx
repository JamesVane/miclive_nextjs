/** @format */

import React from "react";
import styles from "./styles.module.css";
import { PurchasePageData } from "@/api_functions/getPageDataForPurchasePage";
import { Button, LinearProgress } from "@mui/material";
import {
	ArrowBackIosRounded,
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
} from "@mui/icons-material";
import SkeletonOrImage from "@/SkeletonOrImage";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";

interface PurchaseTicketPageProps {
	pageData: PurchasePageData;
	handlePurchaseTicket: () => void;
	handleBack: () => void;
	isPurchasing: boolean;
}

function PurchaseTicketPage({
	pageData,
	handlePurchaseTicket,
	handleBack,
	isPurchasing,
}: PurchaseTicketPageProps) {
	return (
		<div className={styles.main_div}>
			<div className={styles.meat_div}>
				<Button
					disabled={isPurchasing}
					onClick={handleBack}
					startIcon={<ArrowBackIosRounded />}
					color="secondary"
					sx={{ position: "absolute", left: "0px", top: "0px" }}>
					back
				</Button>
				<div className={styles.event_data_div}>
					<div className={styles.event_pic_container}>
						<div className={styles.pic_div}>
							<SkeletonOrImage type="event" id={pageData.base_event} />
						</div>
					</div>
					<div className={styles.right_div}>
						<div className={styles.event_name}>{pageData.name}</div>
						<div className={styles.date_loc_div}>
							<div className={styles.date_time_split}>
								<CalendarMonthRounded sx={{ marginRight: "5px" }} />
								{formatDateString(pageData.start_time)}
							</div>
							<div className={styles.date_time_split}>
								<AccessTimeRounded sx={{ marginRight: "5px" }} />
								{`${formatTimeHour(pageData.start_time)} - ${formatTimeHour(
									pageData.end_time
								)}`}
							</div>
						</div>
						<div className={styles.date_loc_div}>
							<LocationOnRounded sx={{ marginRight: "5px" }} />
							<div className={styles.elipses_text}>
								{pageData.location.name}
							</div>
						</div>
					</div>
				</div>
				<Button
					disabled={isPurchasing}
					onClick={handlePurchaseTicket}
					variant="outlined"
					color="success">
					purchase ticket
				</Button>
				{isPurchasing ? (
					<LinearProgress
						sx={{ position: "absolute", bottom: "0px", width: "100%" }}
					/>
				) : null}
			</div>
		</div>
	);
}

export default PurchaseTicketPage;
