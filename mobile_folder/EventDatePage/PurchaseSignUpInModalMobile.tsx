/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, IconButton } from "@mui/material";
import {
	CloseRounded,
	PersonAddAltRounded,
	LoginRounded,
	ConfirmationNumberRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface PurchaseSignUpInModalMobileProps {
	closeModal: () => void;
	specificEventId: number;
	eventName: string;
}

function PurchaseSignUpInModalMobile({
	closeModal,
	specificEventId,
	eventName,
}: PurchaseSignUpInModalMobileProps) {
	const router = useRouter();

	function handlBackdropClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.stopPropagation();
		closeModal();
	}

	function handleLogIn() {
		router.push(`/m/buy_ticket/sign_in/${specificEventId}/${eventName}`);
	}

	function handleSignUp() {
		router.push(`/m/buy_ticket/sign_up/${specificEventId}/${eventName}`);
	}

	return (
		<div
			onClick={handlBackdropClick}
			className={styles.sign_up_in_buy_modal_back}>
			<div
				className={styles.but_ticket_modal_body}
				onClick={(e) => e.stopPropagation()}>
				<IconButton
					onClick={closeModal}
					sx={{
						position: "absolute",
						top: "0px",
						right: "0px",
						height: "35px",
						width: "35px",
					}}>
					<CloseRounded sx={{ height: "35px", width: "35px" }} />
				</IconButton>
				<Button
					onClick={handleSignUp}
					startIcon={
						<PersonAddAltRounded sx={{ height: "30px", width: "30px" }} />
					}
					variant="outlined"
					sx={{ fontSize: "28px" }}>
					sign-up
				</Button>
				<div className={styles.buy_text_div}>Or</div>
				<Button
					onClick={handleLogIn}
					sx={{ fontSize: "28px" }}
					startIcon={<LoginRounded sx={{ height: "30px", width: "30px" }} />}
					variant="outlined">
					log-in
				</Button>
				<div className={styles.buy_text_div}>To Purchase Ticket</div>
				<ConfirmationNumberRounded
					color="primary"
					sx={{ rotate: "13deg", height: "40px", width: "40px" }}
				/>
			</div>
		</div>
	);
}

export default PurchaseSignUpInModalMobile;
