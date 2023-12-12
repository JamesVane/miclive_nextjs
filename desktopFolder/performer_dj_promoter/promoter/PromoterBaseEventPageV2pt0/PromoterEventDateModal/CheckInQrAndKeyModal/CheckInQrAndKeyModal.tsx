/** @format */

import styles from "./styles.module.css";
import { Button, IconButton } from "@mui/material";
import { CloseRounded, DownloadRounded } from "@mui/icons-material";
import SkeletonOrImage from "@/SkeletonOrImage";
import DividerH from "@/universalComponents/DividerH";

interface CheckInQrAndKeyModalProps {
	closeModal: () => void;
	uuid: string;
	checkinKey: string;
	handleDownload: () => void;
}

function CheckInQrAndKeyModal({
	closeModal,
	uuid,
	checkinKey,
	handleDownload,
}: CheckInQrAndKeyModalProps) {
	return (
		<>
			<IconButton
				onClick={closeModal}
				sx={{
					position: "absolute",
					right: "0px",
					top: "0px",
					height: "40px",
					width: "40px",
				}}>
				<CloseRounded sx={{ height: "35px", width: "35px" }} />
			</IconButton>
			<div className={styles.qr_div}>
				<SkeletonOrImage type="qr" id={uuid} />
			</div>
			<Button
				size="large"
				startIcon={<DownloadRounded />}
				onClick={handleDownload}
				sx={{ marginTop: "10px" }}
				variant="outlined">
				download qr code
			</Button>
			<DividerH />
			<div className={styles.key_row}>
				<div className={styles.key_title}>Check-In Key:</div>
				<div className={styles.checkin_key}>{checkinKey}</div>
			</div>
		</>
	);
}

export default CheckInQrAndKeyModal;
