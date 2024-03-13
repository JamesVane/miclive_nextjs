/** @format */

import React from "react";
import styles from "./styles.module.css";
import { IconButton, Button } from "@mui/material";
import { CloseRounded, LogoutRounded } from "@mui/icons-material";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { setCurrentSub as setCurrentSubSlice } from "@/store/currentSubStore";
import { useRouter, usePathname } from "next/navigation";

interface SettingsModalProps {
	closeModal: () => void;
}

function SettingsModal({ closeModal }: SettingsModalProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	async function handleLogOut() {
		await Auth.signOut();
		dispatch(setCurrentSubSlice(null));
		localStorage.clear();
		sessionStorage.clear();
		router.push("/m");
	}
	return (
		<div onClick={closeModal} className={styles.settings_overlay_modal}>
			<div
				className={styles.settings_paper}
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<div className={styles.settings_header}>
					<IconButton
						color="secondary"
						sx={{
							position: "absolute",
							right: "0px",
						}}>
						<CloseRounded onClick={closeModal} />
					</IconButton>
					Account info & settings
				</div>
				<div className={styles.settings_row}>
					{" "}
					<Button
						onClick={handleLogOut}
						startIcon={<LogoutRounded />}
						variant="outlined">
						log-out
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SettingsModal;
