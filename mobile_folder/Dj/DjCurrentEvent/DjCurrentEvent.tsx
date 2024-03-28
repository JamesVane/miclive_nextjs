/** @format */

import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Button, Paper, Tabs, Tab, Divider, Avatar } from "@mui/material";
import {
	CloseRounded,
	PlayCircleOutlineRounded,
	PauseCircleOutlineRounded,
	SkipNextRounded,
	StopCircleRounded,
} from "@mui/icons-material";
import DjCurrentEventNotCheckedHelper from "./DjCurrentEventNotCheckedHelper";
import DjCurrentEventCueHelper from "./DjCurrentEventCueHelper";
import DjCurrentEventPerformedHelper from "./DjCurrentEventPerformedHelper";

function DjCurrentEvent() {
	const [devStarted, setDevStarted] = useState(false);
	const [devPaused, setDevPaused] = useState(false);
	const router = useRouter();
	const [selectedTab, setSelectedTab] = React.useState<
		"not checked" | "cue" | "performed"
	>("not checked");
	const onTabChange = (
		event: React.SyntheticEvent,
		newValue: "not checked" | "cue" | "performed"
	) => {
		setSelectedTab(newValue);
	};
	return (
		<div className={styles.main_div}>
			<Paper className={styles.header_paper} square>
				<div className={styles.back_name_div}>
					<Button
						color="secondary"
						onClick={() => router.push("/dj")}
						startIcon={<CloseRounded />}
						sx={{ position: "absolute", left: 0 }}>
						exit
					</Button>
					Dallas Open Mic
					<div className={styles.timer_div}>
						<div className={styles.timer_decoration}>03:55:25</div>
					</div>
				</div>
				<Divider variant="middle" />
				<Tabs sx={{ width: "100%" }} value={selectedTab} onChange={onTabChange}>
					<Tab
						sx={{ width: "33%" }}
						label="Not Checked"
						value={"not checked"}
					/>
					<Tab sx={{ width: "33%" }} label="Cue" value={"cue"} />
					<Tab sx={{ width: "34%" }} label="Performed" value={"performed"} />
				</Tabs>
			</Paper>
			<div className={styles.header_bumper} />
			{selectedTab === "not checked" ? (
				<DjCurrentEventNotCheckedHelper />
			) : selectedTab === "cue" ? (
				<DjCurrentEventCueHelper />
			) : selectedTab === "performed" ? (
				<DjCurrentEventPerformedHelper />
			) : null}
			<div className={styles.bottom_bumper} />
			<Paper square className={styles.bottom_paper}>
				{!devStarted ? (
					<div className={styles.bottom_paper_start}>
						<div className={styles.posted_start_time_div}>
							<div className={styles.posted_time_text}>Posted Start Time:</div>
							<div className={styles.posted_time_number}>8:30 PM</div>
						</div>

						<Button
							onClick={() => setDevStarted(true)}
							sx={{ height: "80%", marginLeft: "10px", fontSize: "20px" }}
							variant="outlined"
							startIcon={
								<PlayCircleOutlineRounded
									sx={{ width: "30px", height: "30px" }}
								/>
							}>
							start event
						</Button>
					</div>
				) : (
					<div className={styles.bottom_paper_buttons}>
						<Button
							size="small"
							onClick={() => setDevPaused(!devPaused)}
							sx={{ height: "75%", width: "30%" }}
							variant="outlined"
							startIcon={
								devPaused ? (
									<PlayCircleOutlineRounded
										sx={{
											width: "35px",
											height: "35px",
											marginRight: "-12.5px",
										}}
									/>
								) : (
									<PauseCircleOutlineRounded
										sx={{
											width: "35px",
											height: "35px",
											marginRight: "-12.5px",
										}}
									/>
								)
							}>
							{devPaused ? "resume event" : "pause event"}
						</Button>
						<Button
							size="small"
							sx={{ height: "75", width: "37.5%" }}
							variant="outlined"
							startIcon={
								<Avatar
									sx={{
										width: "35px",
										height: "35px",
										marginRight: "-10px",
										backgroundColor: "transparent",
										border: "3px solid #f7dca1ff",
									}}>
									<SkipNextRounded
										color="primary"
										sx={{ width: "25px", height: "25px" }}
									/>
								</Avatar>
							}>
							next performer
						</Button>
						<Button
							size="small"
							sx={{ height: "75%", width: "25%" }}
							variant="outlined"
							onClick={() => setDevStarted(false)}
							startIcon={
								<StopCircleRounded
									sx={{ width: "35px", height: "35px", marginRight: "-5px" }}
								/>
							}>
							end event
						</Button>
					</div>
				)}
			</Paper>
		</div>
	);
}

export default DjCurrentEvent;
