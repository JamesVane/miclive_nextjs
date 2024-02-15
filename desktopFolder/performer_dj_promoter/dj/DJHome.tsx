/** @format */
"use client";

import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import SplashPage from "@/SplashPage";
import HomeBarV2 from "@desk/HomeBarV2";
import styles from "./styles.module.css";
import DjEventDateList from "./DjEventDateList";
import DjBaseEventList from "./DjBaseEventList";
import { Tabs, Tab, Button } from "@mui/material";
import { setDjEventDateList } from "@/store/DjEventDateListV2pt0Slice";
import { getDjEventDateList } from "@/api_functions/getDjEventDateList";
import { setPrimaryDjEventList } from "@/store/DjPrimaryEventsListV2pt0Slice";
import { getDjPrimaryEventsV2pt0 } from "@/api_functions/getDjPrimaryEventsV2pt0";
import { PriorityHighRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function DJHome() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const [selectedTab, setSelectedTab] = useState(1);

	const onTabChange = (event: React.SyntheticEvent, newValue: 1 | 2) => {
		setSelectedTab(newValue);
	};

	async function fetchData() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];

			const [PrimayEventList, EventDateList] = await Promise.all([
				getDjPrimaryEventsV2pt0(roleId),
				getDjEventDateList(roleId),
			]);

			if (PrimayEventList) {
				dispatch(setPrimaryDjEventList(PrimayEventList));
			}

			if (EventDateList) {
				dispatch(setDjEventDateList(EventDateList));
			}
		} catch (err) {
			console.log("Error fetching user profile or performer data");
		}
	}

	useEffect(() => {
		fetchData().then(() => setIsLoading(false));
	}, []);

	function goToCurrent() {
		router.push("/dj/manage_event/152");
	}

	return (
		<>
			{isLoading ? (
				<div className={styles.splash_container}>
					<SplashPage />
				</div>
			) : (
				<div className={styles.main_div}>
					<HomeBarV2 hasProfile={true}>
						<div
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Tabs value={selectedTab} onChange={onTabChange}>
								<Tab sx={{ fontSize: "25px" }} label="Events" value={1} />
								<Tab sx={{ fontSize: "25px" }} label="Event Dates" value={2} />
							</Tabs>
							<Button
								onClick={goToCurrent}
								sx={{ marginBottom: "7.5px", marginLeft: "7.5px" }}
								variant="outlined"
								startIcon={<PriorityHighRounded />}
								color="success">
								open current event
							</Button>
						</div>
					</HomeBarV2>
					<div className={styles.container_div}>
						{selectedTab === 1 ? (
							<DjBaseEventList />
						) : selectedTab === 2 ? (
							<DjEventDateList />
						) : null}
					</div>
				</div>
			)}
		</>
	);
}

export default DJHome;
