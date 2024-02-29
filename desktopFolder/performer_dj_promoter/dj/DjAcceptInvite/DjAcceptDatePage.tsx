/** @format */

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Paper, Button, Box, LinearProgress } from "@mui/material";
import AvatarSimple from "@desk/AvatarSimple";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	AccessTimeRounded,
	CalendarMonthRounded,
	CheckRounded,
	HomeRounded,
	LocationOnRounded,
	WarningAmberRounded,
} from "@mui/icons-material";
import {
	formatStringDate,
	formatStringToTime,
} from "@/generic_functions/date_formaters";
import { checkDjInviteDateOverlap } from "@/api_functions/checkDjInviteDateOverlap";
import { addDjToSpecificEventDate } from "@/api_functions/addDjToSpecificEventDate";
import { useRouter } from "next/navigation";
import DividerH from "@/universalComponents/DividerH";

function DjAcceptDatePage() {
	const router = useRouter();

	const [roleId, setRoleId] = useState(0);
	const [displayName, setDisplayName] = useState("");
	const [isOverlapping, setIsOverlapping] = useState(false);
	const [isAccepting, setIsAccepting] = useState(false);
	const [hasAccepted, setHasAccepted] = useState(false);
	const [badKey, setBadKey] = useState(false);

	const { dateObject, uuid } = useSelector(
		(state: RootState) => state.djInviteState
	);

	const parsedLocation =
		typeof dateObject.location === "string"
			? JSON.parse(dateObject.location)
			: dateObject.location;

	useEffect(() => {
		async function setAuth() {
			const currentUser = await Auth.currentAuthenticatedUser();
			const authRoleId = currentUser.attributes["custom:RoleId"];
			checkDjInviteDateOverlap(
				authRoleId,
				dateObject.startTime,
				dateObject.endTime
			).then((res) => {
				setIsOverlapping(res);
			});
			const authDisplayName = currentUser.attributes["custom:DisplayUsername"];
			setRoleId(authRoleId);
			setDisplayName(authDisplayName);
		}
		setAuth();
	}, []);

	function handleGoHome() {
		router.push("/dj");
	}

	function handleAcceptInvite() {
		setIsAccepting(true);
		addDjToSpecificEventDate(roleId, uuid).then((res) => {
			if (res === "dj added to event") {
				setIsAccepting(false);
				setHasAccepted(true);
			} else {
				setIsAccepting(false);
				setBadKey(true);
			}
		});
	}

	function TruncateString(text: string) {
		const truncated = text.length > 40 ? `${text.substring(0, 40)}...` : text;

		return <span>{truncated}</span>;
	}

	return (
		<>
			{roleId === 0 ? (
				<SplashPage />
			) : (
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
										<AvatarSimple ninety type="dj" id={roleId} />
									</div>
									{displayName}
								</div>
								<DividerH />
								<div className={styles.accept_date_event_bottom}>
									{hasAccepted ? null : "Invite to DJ for"}
								</div>
								<div className={styles.date_event_decoration}>
									<div className={styles.date_event_row}>
										<div className={styles.date_event_pic}>
											<div className={styles.date_event_pic_decoration}>
												<img
													src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${dateObject.baseEventId}.jpg`}
													style={{
														width: "100%",
														height: "100%",
													}}
												/>
											</div>
										</div>
										{dateObject.baseEventName}
									</div>
									<div className={styles.accept_date_Date_time_row}>
										<CalendarMonthRounded
											sx={{ height: "30px", width: "30px", marginRight: "5px" }}
										/>
										{formatStringDate(dateObject.startTime)}
									</div>
									<div className={styles.accept_date_Date_time_row}>
										<AccessTimeRounded
											sx={{ height: "30px", width: "30px", marginRight: "5px" }}
										/>
										{formatStringToTime(dateObject.startTime)} -{" "}
										{formatStringToTime(dateObject.endTime)}
									</div>
									<div className={styles.accept_date_Date_time_row}>
										<LocationOnRounded
											sx={{ height: "30px", width: "30px", marginRight: "5px" }}
										/>
										{TruncateString(parsedLocation.name)}
									</div>
								</div>
								{isOverlapping || hasAccepted ? (
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
									{isOverlapping || hasAccepted ? null : (
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
			)}
		</>
	);
}

export default DjAcceptDatePage;
