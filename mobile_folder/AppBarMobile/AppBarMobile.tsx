/** @format */

import React from "react";
import styles from "./styles.module.css";
import { IconButton, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import {
	AccountCircleRounded,
	LogoutRounded,
	ArrowBackIosNewRounded,
} from "@mui/icons-material";
import vertLogo from "@/images/miclive_svg_vert.svg";
import ViewUserInfoModalMobile from "@mobi/ViewUserInfoModalMobile";
import Image from "next/image";

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
	const router = useRouter();

	function handleNavigateProfile() {
		router.push(`/m/profile`);
	}

	function handleNavigateBackFromProfile() {
		router.back();
	}

	function handleLogOut() {
		localStorage.clear();
		sessionStorage.clear();
		router.push("/m");
	}

	return (
		<>
			<ViewUserInfoModalMobile />
			<div className={styles.main_div}>
				<div className={styles.div_helper}>
					{hasLogo ? (
						<div className={styles.miclive}>
							<Image alt="logo" src={vertLogo} style={{ width: "65%" }} />
						</div>
					) : null}
					{profileButton ? (
						<IconButton
							onClick={handleNavigateProfile}
							sx={{
								position: "absolute",
								right: 0,
								height: "50px",
								width: "50px",
								color: "primary.main",
							}}>
							<AccountCircleRounded sx={{ height: "40px", width: "40px" }} />
						</IconButton>
					) : null}
					{profilePage ? (
						<>
							<Button
								onClick={handleLogOut}
								startIcon={<LogoutRounded />}
								sx={{ position: "absolute", right: 0 }}>
								log-out
							</Button>
							<Button
								onClick={handleNavigateBackFromProfile}
								startIcon={<ArrowBackIosNewRounded />}
								color="secondary"
								sx={{ position: "absolute", left: 0 }}>
								back
							</Button>
						</>
					) : null}
					{children}
				</div>
			</div>
			<div className={styles.tabs_bumper} />
		</>
	);
};

export default AppBarMobile;
