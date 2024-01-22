/** @format */
"use client";

import React from "react";
import styles from "./styles.module.css";
import DividerH from "@/universalComponents/DividerH";
import { Button, Box, Avatar, IconButton } from "@mui/material";
import {
	HomeRounded,
	CampaignRounded,
	AddCircleRounded,
	MessageRounded,
} from "@mui/icons-material";
import Image from "next/image";
import horizLogo from "@/images/miclive_svg_horiz.svg";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { letterToHexcodeObject, TwoLetterKey } from "@/lettersToHexcodesObject";

interface PromoterManageHeaderProps {
	setAddPerformerModalOpen: () => void;
}

function PromoterManageHeader({
	setAddPerformerModalOpen,
}: PromoterManageHeaderProps) {
	const router = useRouter();

	const { roster: rosterObject, event_cue_position: eventQueuePosition } =
		useSelector((state: RootState) => state.PromoterManageEventState);

	const currentPerformerObject = rosterObject.checked_in[eventQueuePosition];

	const performerName = currentPerformerObject.performer_name;

	const firstTwoLettersOfPerformerNameCapitolized =
		(performerName[0].toUpperCase() +
			performerName[1].toUpperCase()) as TwoLetterKey;

	const noPicColor =
		letterToHexcodeObject[firstTwoLettersOfPerformerNameCapitolized];

	function handleGoHome() {
		router.push("/promoter");
	}

	return (
		<>
			<div className={styles.header_div}>
				<Button
					onClick={handleGoHome}
					startIcon={<HomeRounded />}
					color="secondary"
					variant="outlined">
					{" "}
					home
				</Button>
				<Box
					className={styles.current_performer_div}
					sx={{
						backgroundColor: "success.main",
					}}>
					<div className={styles.current_performer_left}>
						<Box
							sx={{
								backgroundColor: "background.default",
								color: "success.main",
							}}
							className={styles.current_performer_box_text}>
							Current Performer
						</Box>
						<div className={styles.current_performer_chip}>
							<div className={styles.current_perf_pic}>
								<Avatar
									sx={{
										height: "65px",
										width: "65px",
										backgroundColor: noPicColor,
									}}>
									{currentPerformerObject.is_temp_account ? (
										firstTwoLettersOfPerformerNameCapitolized
									) : (
										<img
											src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/performer_pictures/performer_${currentPerformerObject.performer_id}.jpg`}
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									)}
								</Avatar>
							</div>
							<div className={styles.current_perf_chip_name_msg}>
								<div className={styles.current_perf_name}>{performerName}</div>
								<div className={styles.current_perf_msg}>
									<IconButton
										disabled={true}
										color="success"
										sx={{
											width: "35px",
											height: "35px",
											marginTop: "-2.5px",
											marginBottom: "-7.5px",
										}}>
										<MessageRounded />
									</IconButton>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.current_performer_right}>
						{eventQueuePosition}
					</div>
				</Box>
				<div className={styles.action_buttons_columns}>
					<Button
						sx={{
							marginBottom: "2.5px",
						}}
						color="warning"
						startIcon={<CampaignRounded />}
						variant="outlined">
						make announcement
					</Button>
					<Button
						onClick={setAddPerformerModalOpen}
						startIcon={<AddCircleRounded />}
						sx={{
							marginTop: "2.5px",
						}}
						variant="outlined">
						add walkin performer
					</Button>
				</div>
			</div>
			<DividerH />
		</>
	);
}

export default PromoterManageHeader;
