/** @format */

import React from "react";
import { Paper, Divider, Box, Button, LinearProgress } from "@mui/material";
import styles from "./styles.module.css";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
	CheckRounded,
	HomeRounded,
	WarningAmberRounded,
} from "@mui/icons-material";
import { putAcceptMainDjEventInvite } from "../../api_functions/putAcceptMainDjEventInvite";

function DjAcceptEventPage() {
	const router = useRouter();

	const [roleId, setRoleId] = useState(0);
	const [displayName, setDisplayName] = useState("");
	const [isAccepting, setIsAccepting] = useState(false);
	const [hasAccepted, setHasAccepted] = useState(false);
	const [badKey, setBadKey] = useState(false);

	const { eventObject, uuid } = useSelector(
		(state: RootState) => state.djInviteState
	);

	useEffect(() => {
		async function setAuth() {
			const currentUser = await Auth.currentAuthenticatedUser();
			const authRoleId = currentUser.attributes["custom:RoleId"];
			const authDisplayName = currentUser.attributes["custom:DisplayUsername"];
			setRoleId(authRoleId);
			setDisplayName(authDisplayName);
		}
		setAuth();
	}, []);

	function handleGoHome() {
		router.push("/m/dj");
	}

	function handleAcceptInvite() {
		setIsAccepting(true);
		putAcceptMainDjEventInvite(roleId, uuid).then((res) => {
			console.log("RESS", res);
			if (res === "invite accepted") {
				setIsAccepting(false);
				setHasAccepted(true);
			} else {
				setIsAccepting(false);
				setBadKey(true);
			}
		});
	}

	return (
		<div className={styles.accept_main}>
			<Paper className={styles.accept_date_event_paper}>
				{badKey ? (
					<>
						<div className={styles.bad_key_accept}>
							Bad URL. (it may be expired)
						</div>
						<Button
							disabled={isAccepting}
							onClick={handleGoHome}
							startIcon={<HomeRounded />}
							size="large"
							variant="outlined">
							Go Home
						</Button>
					</>
				) : (
					<>
						<div className={styles.accept_date_event_top}>
							<div className={styles.date_event_accept_dj_pic}>
								<AvatarSimpleMobile ninety type="dj" id={roleId} />
							</div>
							{displayName}
						</div>
						<div className={styles.divider_div_hunned}>
							<Divider flexItem variant="middle" />
						</div>
						<div className={styles.accept_date_event_bottom}>
							{hasAccepted ? null : "Invite to be the Main DJ for"}
						</div>
						<div className={styles.date_event_decoration}>
							<div className={styles.date_event_row}>
								<div className={styles.date_event_pic}>
									<div className={styles.date_event_pic_decoration}>
										<img
											src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${eventObject.baseEventId}.jpg`}
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									</div>
								</div>
								{eventObject.baseEventName}
							</div>
						</div>
						{hasAccepted ? (
							<Box
								className={styles.date_invite_overlaping_or_accept}
								sx={{
									color: hasAccepted ? "success.main" : "warning.main",
								}}>
								{hasAccepted ? (
									<CheckRounded sx={{ marginRight: "5px" }} />
								) : (
									<WarningAmberRounded />
								)}{" "}
								{hasAccepted
									? "Invite Accepted!"
									: "You already have an event on this date."}
							</Box>
						) : null}
						<div className={styles.accept_date_buttons}>
							<Button
								disabled={isAccepting}
								onClick={handleGoHome}
								startIcon={<HomeRounded />}
								sx={{ marginRight: "10px" }}
								size="large"
								variant="outlined">
								Go Home
							</Button>
							{hasAccepted ? null : (
								<Button
									disabled={isAccepting}
									onClick={handleAcceptInvite}
									startIcon={<CheckRounded />}
									sx={{ marginLeft: "10px" }}
									size="large"
									color="success"
									variant="outlined">
									accept
								</Button>
							)}
						</div>
						{isAccepting ? (
							<LinearProgress
								sx={{ position: "absolute", bottom: "0px", width: "100%" }}
							/>
						) : null}
					</>
				)}
			</Paper>
		</div>
	);
}

export default DjAcceptEventPage;
