/** @format */

import { useState } from "react";
import {
	Paper,
	Button,
	Box,
	ButtonGroup,
	Snackbar,
	Alert,
} from "@mui/material";
import styles from "./styles.module.css";
import CreateHeaderSpecific from "./CreateHeaderSpecific";
import {
	CheckRounded,
	IosShareRounded,
	InsertLinkRounded,
	WarningAmberRounded,
} from "@mui/icons-material";

interface CreateDateInviteDjProps {
	handleDone: () => void;
	uuid: string;
}

function CreateDateInviteDj({ handleDone, uuid }: CreateDateInviteDjProps) {
	const [dateSnack, setDateSnack] = useState(false);
	const [notOffered, setNotOffered] = useState(false);

	const wlo = window.location.origin;
	const dateURL = `${wlo}/dj_accept_date/${uuid}`;

	const dateShareData = {
		title: "Date Dj Invite",
		text: "Link for DJ to accept date",
		url: dateURL,
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

	const handleDateSnackClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setDateSnack(false);
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
			<Paper className={styles.base_event_paper}>
				<CreateHeaderSpecific>Invite DJ</CreateHeaderSpecific>

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
					size="large"
					color="success"
					endIcon={<CheckRounded />}
					variant="outlined"
					onClick={handleDone}
					sx={{ marginTop: "20px", fontSize: "25px" }}>
					Done
				</Button>
			</Paper>
		</>
	);
}

export default CreateDateInviteDj;
