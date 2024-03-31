/** @format */

import { Button, Divider, LinearProgress } from "@mui/material";
import { PurchasePageData } from "../../api_functions_no_auth/getPageDataForPurchasePage";
import {
	ArrowBackIosRounded,
	CalendarMonthRounded,
	AccessTimeRounded,
	LocationOnRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import {
	formatDateString,
	formatTimeHour,
} from "../../generic_functions/date_formaters";

interface PurchaseTicketProps {
	pageData: PurchasePageData;
	handlePurchaseTicket: () => void;
	handleBack: () => void;
	isPurchasing: boolean;
}

function PurchaseTicket({
	pageData,
	handlePurchaseTicket,
	handleBack,
	isPurchasing,
}: PurchaseTicketProps) {
	return (
		<div className={styles.main_div}>
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
						<img
							src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${pageData.base_event}.jpg`}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					</div>
				</div>
				<div className={styles.right_div}>{pageData.name}</div>
			</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
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
				<div className={styles.elipses_text}>{pageData.location.name}</div>
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
	);
}

export default PurchaseTicket;
