/** @format */

import { useState } from "react";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import styles from "../styles.module.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button, Divider, LinearProgress, Box } from "@mui/material";
import { useRouter } from "next/navigation";

interface WalkInEventKeyProps {
	wrongCodeDisplay: boolean;
	setWrongCodeDisplay: (arg: boolean) => void;
	handleComplete: (value: string) => void;
	isLoading: boolean;
}

function WalkInEventKey({
	wrongCodeDisplay,
	setWrongCodeDisplay,
	handleComplete,
	isLoading,
}: WalkInEventKeyProps) {
	const router = useRouter();

	const [checkinKey, setCheckinKey] = useState("");

	const validateChar = (value: string) => {
		if (value.match(/^[0-9]+$/)) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className={styles.code_and_qr_main_div}>
			<Button
				onClick={() => router.push("/m")}
				size="small"
				color="secondary"
				sx={{ position: "absolute", left: "0px", top: "0px" }}
				startIcon={<ArrowBackIosNewRounded />}>
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
					onChange={(value) => {
						setWrongCodeDisplay(false);
						setCheckinKey(value);
					}}
					validateChar={validateChar}
					onComplete={handleComplete}
				/>
			</div>
			{wrongCodeDisplay ? (
				<Box color="error.main" className={styles.key_error_text}>
					Incorrect Key
				</Box>
			) : null}
			{isLoading ? <LinearProgress sx={{ width: "100%" }} /> : null}
		</div>
	);
}

export default WalkInEventKey;
