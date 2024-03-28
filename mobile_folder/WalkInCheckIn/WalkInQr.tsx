/** @format */
"use client";

import { useState } from "react";
import {
	Button,
	Divider,
	CircularProgress,
	LinearProgress,
} from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import QrReader from "react-qr-scanner";

function WalkInQr() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [hasScanned, setHasScanned] = useState(false);
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
				const extractedId = extractQrCodeId(input.text);
				router.push(`/checkinqr/${extractedId}`);
			}
		}
	}

	return (
		<div className={styles.code_and_qr_main_div}>
			<Button
				onClick={() => router.push("/")}
				size="small"
				color="secondary"
				sx={{ position: "absolute", left: "0px", top: "0px" }}
				startIcon={<ArrowBackIosNewRounded />}>
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
		</div>
	);
}

export default WalkInQr;
