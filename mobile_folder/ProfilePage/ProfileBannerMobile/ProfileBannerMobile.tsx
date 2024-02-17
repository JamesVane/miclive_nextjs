/** @format */

import React from "react";
import styles from "./styles.module.css";
import DividerH from "@/universalComponents/DividerH";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { Button } from "@mui/material";
import { EditRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function ProfileBannerMobile() {
	const router = useRouter();

	const usersStateFromStore = useSelector(
		(state: RootState) => state.usersState
	);

	function handleClickEdit() {
		router.push("/m/profile_banner_edit");
	}

	return (
		<div className={styles.main_div}>
			<div className={styles.profile_page_banners_text_header}>
				Profile Page Banners
			</div>
			<DividerH />
			<div className={styles.row_div}>4 X 1</div>
			<div className={styles.four_banner}>
				<img
					src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/promoter_banner_4X1/banner_${usersStateFromStore?.primary_key}`}
					style={{ height: "100%", width: "100%" }}
				/>
			</div>
			<div className={styles.row_div}>3 X 1</div>
			<div className={styles.three_banner}>
				<img
					src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/promoter_banner_3X1/banner_${usersStateFromStore?.primary_key}`}
					style={{ height: "100%", width: "100%" }}
				/>
			</div>
			<Button
				onClick={handleClickEdit}
				startIcon={<EditRounded />}
				sx={{ marginTop: "10px" }}
				variant="outlined"
				size="large">
				change profile banner
			</Button>
		</div>
	);
}

export default ProfileBannerMobile;
