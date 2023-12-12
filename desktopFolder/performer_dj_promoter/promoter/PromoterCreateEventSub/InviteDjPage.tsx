/** @format */
import { useState } from "react";
import { Button, ButtonGroup, Box, Snackbar, Alert } from "@mui/material";
import styles from "./styles.module.css";
import {
	InsertLinkRounded,
	IosShareRounded,
	WarningAmberRounded,
	CheckRounded,
} from "@mui/icons-material";
import CreateHeader from "./CreateHeader";
import { useRouter, usePathname } from "next/navigation";

function InviteDjPage() {
	const router = useRouter();
	const location = usePathname();
	const [dateSnack, setDateSnack] = useState(false);
	const [eventSnack, setEventSnack] = useState(false);
	const [notOffered, setNotOffered] = useState(false);

	const wlo = window.location.origin;
	const dateKey = localStorage.getItem("inviteDateKey");

	const dateURL = `${wlo}/dj_accept_date/${dateKey}`;

	const eventKey = localStorage.getItem("inviteEventKey");

	const eventURL = `${wlo}/dj_accept_event/${eventKey}`;

	const dateShareData = {
		title: "Date Dj Invite",
		text: "Link for DJ to accept date",
		url: dateURL,
	};
	const eventShareData = {
		title: "Event Dj Invite",
		text: "Link for DJ to accept event",
		url: eventURL,
	};

	const handleCopyDateToClipboard = () => {
		navigator.clipboard.writeText(dateURL).then(
			function () {
				setDateSnack(true);
			},
			function (err) {
				console.error("Async: Could not copy text: ", err);
			}
		);
	};

	async function handleShareDateUrl() {
		try {
			await navigator.share(dateShareData);
		} catch (error: any) {
			if (error.message !== "Abort due to cancellation of share.") {
				setNotOffered(true);
			}
		}
	}

	const handleCopyEventToClipboard = () => {
		navigator.clipboard.writeText(eventURL).then(
			function () {
				setEventSnack(true);
			},
			function (err) {
				console.error("Async: Could not copy text: ", err);
			}
		);
	};

	async function handleShareEventUrl() {
		try {
			await navigator.share(eventShareData);
		} catch (error: any) {
			if (error.message !== "Abort due to cancellation of share.") {
				setNotOffered(true);
			}
		}
	}

	const handleDateSnackClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setDateSnack(false);
	};
	const handleEventSnackClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setEventSnack(false);
	};

	return (
		<>
			<Snackbar
				open={notOffered}
				autoHideDuration={6000}
				onClose={() => setNotOffered(false)}>
				<Alert
					onClose={() => setNotOffered(false)}
					severity="error"
					sx={{ width: "100%" }}>
					Share feature not available in this browser
				</Alert>
			</Snackbar>
			<Snackbar
				open={dateSnack}
				autoHideDuration={6000}
				onClose={handleDateSnackClose}>
				<Alert
					onClose={handleDateSnackClose}
					severity="success"
					sx={{ width: "100%" }}>
					Date Dj Link Copied!
				</Alert>
			</Snackbar>
			<Snackbar
				open={eventSnack}
				autoHideDuration={6000}
				onClose={handleEventSnackClose}>
				<Alert
					onClose={handleEventSnackClose}
					severity="success"
					sx={{ width: "100%" }}>
					Event Dj Link Copied!
				</Alert>
			</Snackbar>
			<div className={styles.base_event_paper}>
				<CreateHeader>Invite DJ</CreateHeader>
				<div className={styles.invite_dj_body}>
					<div className={styles.dj_row}>
						<div className={styles.invite_dj_section}>
							<div className={styles.invite_row}>
								Invite <div className={styles.primary_text}>Event</div> Dj
							</div>
							<ButtonGroup size="large">
								<Button
									onClick={handleCopyEventToClipboard}
									startIcon={<InsertLinkRounded />}>
									copy link
								</Button>
								<Button
									onClick={handleShareEventUrl}
									startIcon={<IosShareRounded />}>
									share
								</Button>
							</ButtonGroup>
						</div>
						<div className={styles.invite_dj_section}>
							<div className={styles.invite_row}>
								Invite <div className={styles.primary_text}>Date</div> Dj
							</div>
							<ButtonGroup size="large">
								<Button
									onClick={handleCopyDateToClipboard}
									startIcon={<InsertLinkRounded />}>
									copy link
								</Button>
								<Button
									onClick={handleShareDateUrl}
									startIcon={<IosShareRounded />}>
									share
								</Button>
							</ButtonGroup>
						</div>
					</div>

					<Box
						className={styles.dj_invite_warning}
						sx={{
							color: "warning.main",
						}}>
						<WarningAmberRounded sx={{ marginTop: "5px" }} />
						Ensure only the DJ you want to invite will see this link. Anybody to
						has it will be able to accept the invitiation
					</Box>
					<Button
						sx={{ marginTop: "10px" }}
						onClick={() => router.push("/promoter")}
						size="large"
						color="success"
						variant="outlined"
						startIcon={<CheckRounded />}>
						done
					</Button>
				</div>
			</div>
		</>
	);
}

export default InviteDjPage;
