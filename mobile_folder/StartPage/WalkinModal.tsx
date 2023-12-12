/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, Paper, Divider, IconButton } from "@mui/material";
import {
	CloseRounded,
	KeyRounded,
	QrCode2Rounded,
	LocationOnRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface WalkinModalProps {
	setWalkinOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function WalkinModal({ setWalkinOpen }: WalkinModalProps) {
	const router = useRouter();

	return (
		<div className={styles.modal_div} onClick={() => setWalkinOpen(false)}>
			<Paper onClick={(e) => e.stopPropagation()}>
				<div className={styles.signin_type_box}>
					<IconButton
						onClick={() => setWalkinOpen(false)}
						color="secondary"
						sx={{
							position: "absolute",
							top: 0,
							right: 0,
						}}>
						<CloseRounded />
					</IconButton>
					Sign-Up/Check-In:
					<div className={styles.divider_div} style={{ marginTop: "10px" }}>
						<Divider variant="middle" flexItem />
					</div>
					<Button
						onClick={() => router.push("/m/walkin_key")}
						startIcon={<KeyRounded />}
						sx={{
							marginTop: "15px",
							width: "300px",
							height: "60px",
							fontSize: "20px",
						}}
						variant="outlined">
						Event Key
					</Button>
					<Button
						onClick={() => router.push("/m/walkin_qr")}
						startIcon={<QrCode2Rounded />}
						sx={{
							marginTop: "15px",
							width: "300px",
							height: "60px",
							fontSize: "20px",
						}}
						variant="outlined">
						QR Code
					</Button>
					<Button
						onClick={() => router.push("/m/walkin_location")}
						startIcon={<LocationOnRounded />}
						sx={{
							marginTop: "15px",
							width: "300px",
							height: "60px",
							fontSize: "20px",
						}}
						variant="outlined">
						location
					</Button>
				</div>
			</Paper>
		</div>
	);
}

export default WalkinModal;
