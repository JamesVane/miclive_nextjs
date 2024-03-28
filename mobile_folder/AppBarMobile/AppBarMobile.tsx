/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { IconButton, Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import {
	AccountCircleRounded,
	ArrowBackIosNewRounded,
	SettingsRounded,
} from "@mui/icons-material";
import vertLogo from "@/images/miclive_svg_vert.svg";
import ViewUserInfoModalMobile from "@mobi/ViewUserInfoModalMobile";
import Image from "next/image";
import AlertButton from "./AlertButton";
import SettingsModal from "./SettingsModal";
import AlertModal from "./AlertButton/AlertModal";
import { Auth } from "aws-amplify";

interface AppBarMobileProps {
	children: React.ReactNode;
	profileButton?: boolean;
	profilePage?: boolean;
	hasLogo?: boolean;
}

const AppBarMobile: React.FC<AppBarMobileProps> = ({
	children,
	profileButton,
	profilePage,
	hasLogo,
}) => {
	const location = usePathname();
	const router = useRouter();

	const [settingsModalOpen, setSettingsModalOpen] = useState(false);
	const [alertModalOpen, setAlertModalOpen] = useState(false);

	function handleNavigateProfile() {
		router.push(`/profile`);
	}

	function handleNavigateBackFromProfile() {
		navigateToHome();
	}

	function handleAlertModal(value: boolean) {
		setAlertModalOpen(value);
	}

	const alertButtonVisivle =
		location === "/promoter" ||
		location === "/performer" ||
		location === "/dj" ||
		location === "/profile";

	async function navigateToHome() {
		const user = await Auth.currentAuthenticatedUser();
		const roleType = user.attributes["custom:RoleType"];
		router.push(`/${roleType}`);
	}

	return (
		<>
			{alertModalOpen ? (
				<AlertModal
					handleClose={() => {
						setAlertModalOpen(false);
					}}
				/>
			) : null}
			{settingsModalOpen ? (
				<SettingsModal
					closeModal={() => {
						setSettingsModalOpen(false);
					}}
				/>
			) : null}
			<ViewUserInfoModalMobile />
			<div className={styles.main_div}>
				<div className={styles.div_helper}>
					{hasLogo ? (
						<div className={styles.miclive}>
							<Image alt="logo" src={vertLogo} style={{ width: "65%" }} />
						</div>
					) : null}

					<div className={styles.right_abs_div}>
						{alertButtonVisivle ? (
							<AlertButton handleAlertModal={handleAlertModal} />
						) : null}
						{profileButton ? (
							<IconButton
								onClick={handleNavigateProfile}
								sx={{
									height: "50px",
									width: "50px",
									color: "primary.main",
								}}>
								<AccountCircleRounded sx={{ height: "40px", width: "40px" }} />
							</IconButton>
						) : null}
						{profilePage ? (
							<IconButton
								color="primary"
								onClick={() => {
									setSettingsModalOpen(true);
								}}>
								<SettingsRounded />
							</IconButton>
						) : null}
					</div>

					{profilePage ? (
						<Button
							onClick={handleNavigateBackFromProfile}
							startIcon={<ArrowBackIosNewRounded />}
							color="secondary"
							sx={{ position: "absolute", left: 0 }}>
							back
						</Button>
					) : null}

					{children}
				</div>
			</div>
			<div className={styles.tabs_bumper} />
		</>
	);
};

export default AppBarMobile;
