/** @format */

import { useState } from "react";
import { Avatar, Button, Divider, IconButton } from "@mui/material";
import {
	MessageRounded,
	SwapVert,
	VerticalAlignTopRounded,
	VerticalAlignBottomRounded,
	DisabledByDefaultRounded,
	CheckBoxRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import { PerformerType } from "@/store/PromoterManageEventState";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import AudioChipThing from "./AudioChipThing";

interface PromoterCurrentEventCuePaperProps {
	performerObject: PerformerType;
	cueIndex: number;
}

function PromoterCurrentEventCuePaper({
	performerObject,
	cueIndex,
}: PromoterCurrentEventCuePaperProps) {
	const [swapping, setSwapping] = useState(false);
	return (
		<>
			<div className={styles.roster_paper_wrapper}>
				<div className={styles.roster_paper_pic_number}>
					<AvatarSimpleMobile
						ninety
						type="performer"
						id={performerObject.performer_id}
					/>
				</div>

				<div className={styles.roster_paper_middle_div}>
					<div className={styles.roster_paper_name}>
						{performerObject.performer_name}
					</div>
					<div className={styles.roster_paper_bottom}>
						{!swapping ? (
							<>
								<Button
									startIcon={<MessageRounded />}
									size="small"
									variant="outlined">
									msg
								</Button>
								<AudioChipThing hasAudio={performerObject.has_audio} />
								<Button
									onClick={() => setSwapping(!swapping)}
									sx={{ marginRight: "5px" }}
									size="small"
									variant="outlined"
									startIcon={
										<SwapVert
											sx={{
												marginRight: "-7.5px",
												width: "20px",
												height: "20px",
												marginLeft: "-2.5px",
											}}
										/>
									}>
									swap
								</Button>
							</>
						) : (
							<>
								<Button
									sx={{ width: "80px" }}
									size="small"
									variant="outlined"
									startIcon={<VerticalAlignBottomRounded />}>
									Down
								</Button>
								<Button
									sx={{ width: "80px" }}
									size="small"
									variant="outlined"
									startIcon={<VerticalAlignTopRounded />}>
									Up
								</Button>
								<IconButton
									color="error"
									sx={{ width: "20px", height: "20px" }}>
									<DisabledByDefaultRounded
										sx={{ width: "30px", height: "30px" }}
									/>
								</IconButton>
								<IconButton
									onClick={() => setSwapping(!swapping)}
									color="success"
									sx={{ width: "20px", height: "20px", marginRight: "5px" }}>
									<CheckBoxRounded sx={{ width: "30px", height: "30px" }} />
								</IconButton>
							</>
						)}
					</div>
				</div>

				<div className={styles.roster_paper_pic_number}>
					<Avatar
						sx={{
							width: "85%",
							height: "85%",
							backgroundColor: "transparent",
							border: "1px solid #f7dca1ff",
							color: "#f7dca1ff",
							fontSize: "35px",
						}}>
						{cueIndex}
					</Avatar>
				</div>
			</div>
			<Divider variant="middle" />
		</>
	);
}

export default PromoterCurrentEventCuePaper;
