/** @format */
"use client";

import React from "react";
import styles from "./styles.module.css";
import FloatingMessageDrawer from "@desk/FloatingMessageDrawer";
import { setDrawerIsOpen } from "@/store/openConversationDesktopSlice";
import { IconButton, Button, Box } from "@mui/material";
import {
	AccountCircleRounded,
	MessageRounded,
	LogoutRounded,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import ViewUserInfoModalDesktop from "@desk/ViewUserInfoModalDesktop";
import horizLogo from "@/images/miclive_svg_horiz.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify";
import { setCurrentSub as setCurrentSubSlice } from "@/store/currentSubStore";
import AlertsButton from "./AlertsButton";

interface HomeBarV2Props {
	children: JSX.Element | React.ReactNode;
	hasProfile?: boolean;
	noMessage?: boolean;
	profileOpen?: boolean;
	hasAccountAlertsSection?: boolean;
}
function HomeBarV2({
	children,
	hasProfile,
	noMessage,
	profileOpen,
	hasAccountAlertsSection,
}: HomeBarV2Props) {
	const dispatch = useDispatch();
	const router = useRouter();

	const openDrawer = () => {
		dispatch(setDrawerIsOpen(true));
	};

	function openProfile() {
		router.push("/profile");
	}

	async function handleLogOut() {
		try {
			await Auth.signOut();
			dispatch(setCurrentSubSlice(null));
			localStorage.clear();
			sessionStorage.clear();
			router.push("/");
		} catch (error) {
			console.log("error signing out: ", error);
		}
	}

	function MessageButton() {
		return (
			<Button
				onClick={openDrawer}
				variant="outlined"
				sx={{
					height: "45px",
					width: "140px",
					fontSize: "18px",
					marginRight: "5px",
				}}
				endIcon={<MessageRounded />}>
				Message
			</Button>
		);
	}

	return (
		<>
			<ViewUserInfoModalDesktop />
			{/* <FloatingMessageDrawer /> */}
			<Box
				className={styles.main_paper}
				sx={{ backgroundColor: "background.default" }}>
				<div className={styles.inner_div}>
					<div className={styles.profile_messages_div}>
						{profileOpen ? (
							<Button
								onClick={handleLogOut}
								startIcon={<LogoutRounded />}
								variant="outlined"
								sx={{
									height: "45px",
									width: "140px",
									fontSize: "18px",
									marginRight: "10px",
								}}>
								Log-Out
							</Button>
						) : null}
						{hasProfile && !profileOpen ? (
							<IconButton
								onClick={openProfile}
								color="primary"
								sx={{ height: "70px", width: "70px" }}>
								<AccountCircleRounded sx={{ height: "90%", width: "90%" }} />
							</IconButton>
						) : null}
						{hasAccountAlertsSection ? <AlertsButton /> : null}
					</div>

					<div className={styles.mic_live}>
						<Image style={{ width: "88%" }} alt="logo" src={horizLogo} />
					</div>
					{children}
				</div>
			</Box>
		</>
	);
}

export default HomeBarV2;
