/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { Avatar, Button, Divider, IconButton } from "@mui/material";
import {
	MessageRounded,
	SwapVert,
	VerticalAlignTopRounded,
	VerticalAlignBottomRounded,
	DisabledByDefaultRounded,
	CheckBoxRounded,
} from "@mui/icons-material";

function DjCurrentEventCuePaper() {
	const [swapping, setSwapping] = useState(false);
	return (
		<>
			<div className={styles.roster_paper_wrapper}>
				<div className={styles.roster_paper_pic_number}>
					<Avatar sx={{ width: "85%", height: "85%" }}></Avatar>
				</div>

				<div className={styles.roster_paper_middle_div}>
					<div className={styles.roster_paper_name}>Performer Name</div>
					<div className={styles.roster_paper_bottom}>
						{!swapping ? (
							<>
								<Button
									startIcon={<MessageRounded />}
									size="small"
									variant="outlined">
									msg
								</Button>
								<div className={styles.roster_submitted_audio}>
									<div
										className={styles.roster_submitted_audio_decoration}
										style={{ borderColor: "#757575ff", color: "#757575ff" }}>
										No Audio
									</div>
								</div>

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
						2
					</Avatar>
				</div>
			</div>
			<Divider variant="middle" />
		</>
	);
}

export default DjCurrentEventCuePaper;
