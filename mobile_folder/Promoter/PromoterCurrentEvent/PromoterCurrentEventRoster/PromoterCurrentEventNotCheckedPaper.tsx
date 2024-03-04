/** @format */

import React from "react";
import { Button, Divider } from "@mui/material";
import { MessageRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import AudioChipThing from "./AudioChipThing";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import { PerformerType } from "@/store/PromoterManageEventState";

interface PromoterCurrentEventNotCheckedPaperProps {
	performerObject: PerformerType;
}

function PromoterCurrentEventNotCheckedPaper({
	performerObject,
}: PromoterCurrentEventNotCheckedPaperProps) {
	return (
		<>
			<div className={styles.roster_paper_wrapper}>
				<div className={styles.roster_paper_pic_number}>
					<AvatarSimpleMobile
						ninety
						type="performer"
						id={performerObject.performer_id}
						username={performerObject.performer_name}
					/>
				</div>
				<div className={styles.roster_paper_middle_div}>
					<div className={styles.roster_paper_name}>
						{performerObject.performer_name}
					</div>
					<div className={styles.roster_not_cue_bottom}>
						<Button
							sx={{ marginRight: "10px" }}
							startIcon={<MessageRounded />}
							size="small"
							variant="outlined">
							msg
						</Button>
						<AudioChipThing hasAudio={performerObject.has_audio} />
					</div>
				</div>
			</div>
			<Divider variant="middle" />
		</>
	);
}

export default PromoterCurrentEventNotCheckedPaper;
