/** @format */
"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SplashPage from "@/SplashPage";
import HomeBarV2 from "@desk/HomeBarV2";
import styles from "./styles.module.css";
import DjEventDateList from "./DjEventDateList";
import { Tabs, Tab, Button } from "@mui/material";
import { setDjEventDateList } from "@/store/DjEventDateListV2pt0Slice";
import { getDjEventDateList } from "@/api_functions/getDjEventDateList";
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
			const EventDateList = await getDjEventDateList();

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
								<Tab sx={{ fontSize: "25px" }} label="Event Dates" value={1} />
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
						<DjEventDateList />
					</div>
				</div>
			)}
		</>
	);
}

export default DJHome;
