/** @format */
"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Paper, IconButton, Avatar } from "@mui/material";
import AvatarSimple from "@desk/AvatarSimple";
import {
	DoNotDisturbOnTotalSilenceRounded,
	PushPinRounded,
	CampaignRounded,
	PriorityHighRounded,
	AlbumRounded,
	MicExternalOnRounded,
} from "@mui/icons-material";
import FormatTimeTop from "./FormatTimeTop";
import FormatTimeBottom from "./FormatTimeBottom";
import { setUpdateStatus } from "@/store/conversationListSlice";
import { useDispatch } from "react-redux";
import { putConversationStatus } from "@/api_functions/putConversationStatus";
import { Auth } from "aws-amplify";
import { setOpenConversationDesktop } from "@/store/openConversationDesktopSlice";

interface ConversationRowProps {
	sub: string;
	name: string;
	type: "performer" | "promoter" | "dj";
	roleId: number;
	timestamp: number;
	topMessage: string;
	DND: boolean;
	pinned: boolean;
	unOpened: boolean;
}

function ConversationRowDesktop({
	sub,
	name,
	type,
	roleId,
	timestamp,
	topMessage,
	DND,
	pinned,
	unOpened,
}: ConversationRowProps) {
	const dispatch = useDispatch();
	const [mySub, setMySub] = useState("");

	async function handleSetMySub() {
		const user = await Auth.currentAuthenticatedUser();
		const userId = user.attributes.sub;
		setMySub(userId);
	}

	useEffect(() => {
		handleSetMySub();
	}, []);

	async function handlePinClick(event: any) {
		event.stopPropagation();
		await putConversationStatus({
			sender_sub: mySub,
			reciver_sub: sub,
			pinned_value: pinned ? false : true,
			DND_value: false,
		}).then((res) =>
			dispatch(
				setUpdateStatus({
					sub: sub,
					pinned: pinned ? false : true,
					DND: false,
				})
			)
		);
	}
	async function handleMuteClick(event: any) {
		event.stopPropagation();
		await putConversationStatus({
			sender_sub: mySub,
			reciver_sub: sub,
			pinned_value: false,
			DND_value: DND ? false : true,
		}).then((res) =>
			dispatch(
				setUpdateStatus({
					sub: sub,
					pinned: false,
					DND: DND ? false : true,
				})
			)
		);
	}

	function handleSetConversation() {
		dispatch(setOpenConversationDesktop(sub));
	}

	return (
		<div className={styles.main_div}>
			<Paper
				onClick={handleSetConversation}
				sx={{
					width: "95%",
					height: "100px",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					position: "relative",
					opacity: DND ? "0.7" : "1",
				}}>
				<div className={styles.notification_number}>
					{unOpened ? <PriorityHighRounded /> : null}
				</div>
				<div className={styles.pic_div}>
					<AvatarSimple username={name} type={type} id={roleId} ninety />
					<Avatar
						sx={{
							zIndex: 2000,
							position: "absolute",
							bottom: "0",
							right: "0",
							height: "30px",
							width: "30px",
							backgroundColor: "#1e262bff",
							border: "1px solid #f8dca1ff",
							color: "#f8dca1ff",
						}}>
						{type === "promoter" ? (
							<CampaignRounded />
						) : type === "dj" ? (
							<AlbumRounded />
						) : type === "performer" ? (
							<MicExternalOnRounded />
						) : (
							<MicExternalOnRounded />
						)}
					</Avatar>
				</div>
				<div className={styles.right_side}>
					<div className={styles.right_top}>
						{name}
						<IconButton
							onClick={handleMuteClick}
							sx={{
								color: DND ? "error.main" : "secondary.main",
								width: "45px",
								height: "45px",
								position: "absolute",
								right: "0",
							}}>
							<DoNotDisturbOnTotalSilenceRounded
								sx={{ width: "30px", height: "30px" }}
							/>
						</IconButton>
						<IconButton
							onClick={handlePinClick}
							sx={{
								color: pinned ? "success.main" : "secondary.main",
								width: "45px",
								height: "45px",
								position: "absolute",
								right: "45px",
							}}>
							<PushPinRounded sx={{ width: "30px", height: "30px" }} />
						</IconButton>
					</div>
					<div className={styles.right_bottom}>
						<div className={styles.bottom_left}>{topMessage}</div>
						<div className={styles.bottom_right}>
							<div className={styles.time_date_div}>
								<FormatTimeTop timestamp={timestamp} />
							</div>
							<div className={styles.time_date_div}>
								<FormatTimeBottom timestamp={timestamp} />
							</div>
						</div>
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default ConversationRowDesktop;
