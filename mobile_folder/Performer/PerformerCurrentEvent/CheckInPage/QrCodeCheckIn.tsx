/** @format */

import { useState } from "react";
import {
	Button,
	Divider,
	CircularProgress,
	LinearProgress,
} from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import QrReader from "react-qr-scanner";
import { putPerformerQrCheckin } from "@/api_functions/putPerformerQrCheckin";

interface QrCodeCheckInProps {
	handleToStart: () => void;
	setCheckedIn: () => void;
}

function QrCodeCheckIn({ handleToStart, setCheckedIn }: QrCodeCheckInProps) {
	const [hasScanned, setHasScanned] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [scannerMounting, setScannerMounting] = useState(true);

	function handleError() {
		console.log("scan error");
	}

	function extractQrCodeId(url: string): string {
		const qrCodeId = url.split("checkinqr/")[1];
		return qrCodeId;
	}

	function handleScan(input: any) {
		if (!hasScanned) {
			if (input !== null && input !== undefined) {
				setIsLoading(true);
				setHasScanned(true);
				try {
					const extractedId = extractQrCodeId(input.text);
					putPerformerQrCheckin(extractedId).then((res) => {
						if (res) {
							setCheckedIn();
							setIsLoading(false);
						} else {
							setIsLoading(false);
						}
					});
				} catch {
					setIsLoading(false);
					setHasScanned(false);
				}
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
			Scan Check-In QR-Code:
			<div className={styles.divider_div} style={{ marginBottom: "10px" }}>
				<Divider variant="middle" flexItem />
			</div>
			<div className={styles.qr_div}>
				{scannerMounting ? (
					<CircularProgress sx={{ position: "absolute", display: "flex" }} />
				) : null}
				<QrReader
					key="environment"
					onLoad={() => setScannerMounting(false)}
					constraints={{
						audio: false,
						video: { facingMode: "environment" },
					}}
					delay={500}
					style={{
						height: 500,
						width: 300,
						backgroundColor: "rgba(0,0,0,0.3)",
						borderRadius: "5px",
						overflow: "hidden",
					}}
					onError={handleError}
					onScan={handleScan}
				/>
				{isLoading ? <LinearProgress sx={{ width: "100%" }} /> : null}
			</div>
		</>
	);
}

export default QrCodeCheckIn;
