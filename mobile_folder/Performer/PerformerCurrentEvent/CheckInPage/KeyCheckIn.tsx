/** @format */

import { useState } from "react";
import { Button, Divider, LinearProgress } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import { putPerformerCheckInWithKey } from "@/api_functions/putPerformerCheckInWithKey";

interface KeyCheckInProps {
	handleToStart: () => void;
	setCheckedIn: () => void;
}

function KeyCheckIn({ handleToStart, setCheckedIn }: KeyCheckInProps) {
	const [checkinKey, setCheckinKey] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const validateChar = (value: string) => {
		if (value.match(/^[0-9]+$/)) {
			return true;
		} else {
			return false;
		}
	};

	function handleComplete(value: string) {
		if (!isLoading) {
			setIsLoading(true);
			try {
				putPerformerCheckInWithKey(value).then((res) => {
					if (res.success) {
						setCheckedIn();
						handleToStart();
						setIsLoading(false);
					} else {
						setIsLoading(false);
					}
				});
			} catch {
				setIsLoading(false);
			}
		}
	}

	return (
		<>
			<Button
				onClick={handleToStart}
				size="small"
				sx={{ position: "absolute", left: "2px", top: "2px" }}
				startIcon={<ArrowBackIosNewRounded />}
				color="secondary">
				back
			</Button>
			Enter Check-In Key:
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
			<div className={styles.key_div}>
				<MuiOtpInput
					length={6}
					autoFocus
					value={checkinKey}
					onChange={(value) => setCheckinKey(value)}
					validateChar={validateChar}
					onComplete={handleComplete}
				/>
			</div>
			{isLoading ? <LinearProgress sx={{ width: "100%" }} /> : null}
		</>
	);
}

export default KeyCheckIn;
