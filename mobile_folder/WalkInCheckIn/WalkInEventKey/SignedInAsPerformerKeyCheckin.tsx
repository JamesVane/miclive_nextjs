/** @format */

import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import styles from "../styles.module.css";
import SplashPage from "../../../SplashPage";
import { ArrowForwardRounded, CheckRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { getPerformerCheckIfPurchasedTicket } from "../../../api_functions/getPerformerCheckIfPurchasedTicket";
import { putPerformerCheckInWithKey } from "../../../api_functions/putPerformerCheckInWithKey";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";

interface SignedInAsPerformerKeyCheckinProps {
	checkinKey: string;
}

function SignedInAsPerformerKeyCheckin({
	checkinKey,
}: SignedInAsPerformerKeyCheckinProps) {
	const router = useRouter();

	const [isCheckedIn, setIsCheckedIn] = useState(false);

	const { eventData } = useSelector(
		(state: RootState) => state.walkinKeyCheckInStateSlice
	);

	function handleGoToEvent() {
		router.push(`/m/performer/event/${eventData!.specificEventId}`);
	}

	useEffect(() => {
		getPerformerCheckIfPurchasedTicket(eventData!.specificEventId).then(
			(res) => {
				console.log("res:", res);
				if (res === "has ticket") {
					putPerformerCheckInWithKey(checkinKey).then((res) => {
						if (res) {
							setIsCheckedIn(true);
						}
					});
				} else if (res === "already checked in") {
					setIsCheckedIn(true);
				} else if (res === "no ticket") {
					if (eventData) {
						router.push(
							`/m/walkin_key/purchase/${checkinKey}/${eventData.specificEventId}`
						);
					}
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

export default SignedInAsPerformerKeyCheckin;
