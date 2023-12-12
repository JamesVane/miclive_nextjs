/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { Button, Divider } from "@mui/material";
import {
	AddLocationRounded,
	KeyRounded,
	QrCode2Rounded,
	ArrowBackIosNewRounded,
} from "@mui/icons-material";
import SkeletonOrImage from "@/SkeletonOrImage";
import KeyCheckIn from "./KeyCheckIn";
import QrCodeCheckIn from "./QrCodeCheckIn";
import { useRouter } from "next/navigation";
import LocationCheckIn from "./LocationCheckIn";
// import { useSessionState } from "@/custom_hooks/useSessionState";

interface CheckInPageProps {
	eventName: string;
	baseEventId: number;
	setCheckedIn: () => void;
}

function CheckInPage({
	eventName,
	baseEventId,
	setCheckedIn,
}: CheckInPageProps) {
	const router = useRouter();

	const buttonStyles = {
		fontSize: "26px",
		width: "80%",
		marginTop: "22px",
	};

	function handleBack() {
		router.push("/m/performer");
	}

	const [pageTabState, setPageTabState] = useState<
		"start" | "key" | "qr" | "location"
	>("start");
	/* const [pageTabState, setPageTabState] = useSessionState<
		"start" | "key" | "qr" | "location"
	>("checkInPageTabMobilee", "start"); */

	function handleKeyClick() {
		setPageTabState("key");
	}

	function handleQrClick() {
		setPageTabState("qr");
	}

	function handleLocationClick() {
		setPageTabState("location");
	}

	function handleToStart() {
		setPageTabState("start");
	}

	return (
		<div className={styles.main_div}>
			{pageTabState === "location" ? (
				<LocationCheckIn handleToStart={handleToStart} />
			) : pageTabState === "key" ? (
				<KeyCheckIn handleToStart={handleToStart} setCheckedIn={setCheckedIn} />
			) : pageTabState === "qr" ? (
				<QrCodeCheckIn
					handleToStart={handleToStart}
					setCheckedIn={setCheckedIn}
				/>
			) : (
				<>
					<div className={styles.event_div}>
						<Button
							onClick={handleBack}
							size="small"
							sx={{ position: "absolute", left: "2px", top: "2px" }}
							startIcon={<ArrowBackIosNewRounded />}
							color="secondary">
							back
						</Button>
						<div className={styles.event_pic}>
							<SkeletonOrImage type="event" id={baseEventId} />
						</div>
						{eventName}
					</div>
					Check-In Using:
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<Button
						onClick={handleLocationClick}
						startIcon={
							<AddLocationRounded sx={{ width: "30px", height: "30px" }} />
						}
						variant="outlined"
						sx={buttonStyles}>
						location
					</Button>
					<Button
						onClick={handleKeyClick}
						startIcon={<KeyRounded sx={{ width: "30px", height: "30px" }} />}
						variant="outlined"
						sx={buttonStyles}>
						Event Key
					</Button>
					<Button
						onClick={handleQrClick}
						startIcon={
							<QrCode2Rounded sx={{ width: "30px", height: "30px" }} />
						}
						variant="outlined"
						sx={buttonStyles}>
						QR code
					</Button>
				</>
			)}
		</div>
	);
}

export default CheckInPage;
