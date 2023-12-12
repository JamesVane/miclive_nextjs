/** @format */

import { useEffect, useState } from "react";
import { getPerformerCheckIfPurchasedTicket } from "@/api_functions/getPerformerCheckIfPurchasedTicket";
import { putPerformerQrCheckin } from "@/api_functions/putPerformerQrCheckin";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Button, Box } from "@mui/material";
import { ArrowForwardRounded, CheckRounded } from "@mui/icons-material";
import SplashPage from "@/SplashPage";
import { QrData } from "./PerformerQrLanding";

interface SignedInQrCheckinProps {
	eventData: QrData;
	uuid: string;
}

function SignedInQrCheckin({ eventData, uuid }: SignedInQrCheckinProps) {
	const router = useRouter();

	const [isCheckedIn, setIsCheckedIn] = useState(false);

	function handleGoToEvent() {
		router.push(`/m/performer/event/${eventData.specificEventId}`);
	}

	useEffect(() => {
		getPerformerCheckIfPurchasedTicket(eventData.specificEventId).then(
			(res) => {
				console.log("res:", res);
				if (res === "has ticket") {
					putPerformerQrCheckin(uuid).then((res) => {
						if (res) {
							setIsCheckedIn(true);
						}
					});
				} else if (res === "already checked in") {
					setIsCheckedIn(true);
				} else if (res === "no ticket") {
					router.push(
						`/m/checkinqr/purchase/${uuid}/${eventData.specificEventId}`
					);
				}
			}
		);
	}, []);

	return (
		<>
			{isCheckedIn ? (
				<Box color="success.main" className={styles.checked_in_main_div}>
					<div>
						Checked-In
						<CheckRounded sx={{ marginLeft: "5px" }} />
					</div>
					<Button
						sx={{ marginTop: "15px" }}
						variant="outlined"
						startIcon={<ArrowForwardRounded />}
						onClick={handleGoToEvent}>
						go to event
					</Button>
				</Box>
			) : (
				<SplashPage />
			)}
		</>
	);
}

export default SignedInQrCheckin;
