/** @format */

import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Button, Paper, Tab, Tabs, Divider } from "@mui/material";
import {
	CheckRounded,
	ConfirmationNumberRounded,
	IosShareRounded,
	CloseRounded,
} from "@mui/icons-material";
import PerformerCurrentEventInfoInfo from "./PerformerCurrentEventInfoInfo";
import DescriptionComponent from "@mobi/DescriptionComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function PerformerCurrentEventInfo() {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = React.useState<"info" | "desc">("info");
	const onTabChange = (
		event: React.SyntheticEvent,
		newValue: "info" | "desc"
	) => {
		setSelectedTab(newValue);
	};

	const { event: eventInfo } = useSelector(
		(state: RootState) => state.performerCurrentEventSlice
	);

	return (
		<div className={styles.main_div}>
			<Paper square className={styles.header_paper}>
				<Button
					onClick={() => router.push("/m/performer")}
					sx={{ position: "absolute", left: "0px", top: "0px" }}
					startIcon={<CloseRounded />}
					size="small"
					color="secondary">
					exit
				</Button>
				<div className={styles.pic_div}>
					<div className={styles.pic_wrapper}>
						<img
							src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${eventInfo.base_event_id}.jpg`}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					</div>
				</div>
				<div className={styles.right_head_div}>
					<div className={styles.name}>{eventInfo.event_name}</div>
					<div className={styles.tagline}>{eventInfo.event_tagline}</div>
					<div className={styles.buttons}>
						<Button
							variant="outlined"
							size="small"
							startIcon={<CheckRounded />}>
							FOLLOW
						</Button>
						<Button
							variant="outlined"
							size="small"
							startIcon={<ConfirmationNumberRounded />}>
							TICKET
						</Button>
						<Button
							variant="outlined"
							size="small"
							startIcon={<IosShareRounded />}>
							SHARE
						</Button>
					</div>
				</div>
			</Paper>
			<Paper
				square
				sx={{
					height: "48px",
					width: "100%",
					zIndex: 999,
				}}>
				<Tabs
					sx={{ width: "100%" }}
					value={selectedTab}
					onChange={onTabChange}
					aria-label="disabled tabs example">
					<Tab sx={{ width: "50%" }} label="Info" value={"info"} />
					<Tab sx={{ width: "50%" }} label="Description" value={"desc"} />
				</Tabs>
			</Paper>
			{selectedTab === "info" ? (
				<PerformerCurrentEventInfoInfo />
			) : selectedTab === "desc" ? (
				<div className={styles.description_div}>
					<DescriptionComponent text={eventInfo.base_event_description} />
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<DescriptionComponent text={eventInfo.date_description} />
				</div>
			) : null}
		</div>
	);
}

export default PerformerCurrentEventInfo;
