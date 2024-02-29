/** @format */

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Box, TextField, Button, Tooltip, LinearProgress } from "@mui/material";
import {
	CloseRounded,
	CampaignRounded,
	DriveFileRenameOutlineRounded,
	HelpOutlineOutlined,
} from "@mui/icons-material";
import DividerH from "@/universalComponents/DividerH";
import { cleanAnnouncementMessage } from "@/generic_functions/validationFunctionsForForms";
import { postMakeAnnouncement } from "@/api_functions/postMakeAnnouncement";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { Auth } from "aws-amplify";

interface PromoterMakeAnnouncementManagePageProps {
	close: () => void;
	successfulClose: () => void;
}

function PromoterMakeAnnouncementManagePage({
	close,
	successfulClose,
}: PromoterMakeAnnouncementManagePageProps) {
	const announcementInputRef = useRef<HTMLInputElement>(null);

	const { specific_event_id: specificeventId } = useSelector(
		(state: RootState) => state.PromoterManageEventState.event
	);

	const { event_cue_position: eventQueuePosition } = useSelector(
		(state: RootState) => state.PromoterManageEventState
	);

	const [announcementValue, setAnnouncementValue] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === "Escape") {
			close();
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	useEffect(() => {
		if (announcementInputRef.current) {
			announcementInputRef.current.focus();
		}
	}, [announcementInputRef]);

	const submitIsDisabled = announcementValue.length < 3;

	function handleSetAnnouncemenValue(inputText: string) {
		const cleanedAnnoucementMessage = cleanAnnouncementMessage(inputText);
		setAnnouncementValue(cleanedAnnoucementMessage);
	}

	async function handlemakeAnnouncement() {
		setIsLoading(true);
		const user = await Auth.currentAuthenticatedUser();
		const promoterNameFromUserState = user.attributes["custom:DisplayUsername"];
		postMakeAnnouncement({
			request_specific_event_id: specificeventId.toString(),
			request_message: announcementValue,
			request_queue_position: eventQueuePosition,
			request_promoter_or_dj: "promoter",
			request_sender_name: promoterNameFromUserState,
		})
			.then((res) => {
				setIsLoading(false);
				successfulClose();
			})
			.catch((err) => {
				setIsLoading(false);
				console.error(err);
			});
	}

	return (
		<div className={styles.modal_main_div}>
			<div className={styles.make_announcement_modal}>
				<Tooltip title="Announcement message can only contain letters, numbers, dashes, punctuation and spaces.">
					<HelpOutlineOutlined
						color="secondary"
						sx={{
							height: "28px",
							width: "28px",
							position: "absolute",
							right: "5px",
							top: "5px",
							opacity: ".7",
						}}
					/>
				</Tooltip>
				<Box
					sx={{
						color: "primary.main",
						fontWeight: "bold",
						fontSize: "25px",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<DriveFileRenameOutlineRounded
						sx={{
							marginRight: "2.5px",
						}}
					/>
					Write Announcement Message
				</Box>
				<TextField
					disabled={isLoading}
					value={announcementValue}
					onChange={(e) => handleSetAnnouncemenValue(e.target.value)}
					placeholder="Type Here..."
					label="Announcement Message"
					multiline
					InputProps={{
						inputRef: announcementInputRef,
					}}
					sx={{
						marginTop: "15px",
						marginBottom: "10px",
						width: "90%",
					}}
					maxRows={5}
					minRows={5}
				/>
				<DividerH />
				<div className={styles.announcement_button_row}>
					<Button
						onClick={close}
						sx={{
							marginRight: "5px",
						}}
						variant="outlined"
						startIcon={<CloseRounded />}
						color="secondary">
						cancel
					</Button>
					<Button
						disabled={submitIsDisabled || isLoading}
						onClick={handlemakeAnnouncement}
						sx={{
							marginLeft: "5px",
							position: "relative",
							overflow: "hidden",
						}}
						variant="outlined"
						startIcon={<CampaignRounded />}
						color="primary">
						make announcement
						{isLoading ? (
							<LinearProgress
								sx={{
									position: "absolute",
									bottom: "0px",
									width: "100%",
								}}
							/>
						) : null}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default PromoterMakeAnnouncementManagePage;
