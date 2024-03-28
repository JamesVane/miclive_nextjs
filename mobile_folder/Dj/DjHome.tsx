/** @format */
"use client";

import { useEffect, useState } from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Paper,
	Box,
	Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SplashPage from "@/SplashPage";
import { Snackbar, Alert } from "@mui/material";
import { Auth } from "aws-amplify";
import MessagingButton from "@mobi/Messaging/MessagingButton";
import { CalendarMonthRounded, PriorityHighRounded } from "@mui/icons-material";
import DjEventDateListPage from "./DjEventDateListPage";
import { setDjEventDateList } from "@/store/DjEventDateListV2pt0Slice";
import { getDjEventDateList } from "@/api_functions/getDjEventDateList";
import AppBarMobile from "@mobi/AppBarMobile";

interface DjHomeProps {
	house?: boolean;
}

function DjHome({ house }: DjHomeProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [successfullUpload, setSuccessfullUpload] = useState(false);
	const [selectedTab, setSelectedTab] = useState(1);

	async function fetchData() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];

			const EventDateList = await getDjEventDateList(roleId);

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

	const handleSetTab = (event: React.SyntheticEvent, newValue: number) => {
		setSelectedTab(newValue);
	};

	function goToCurrent() {
		router.push("/dj/manage_event/152");
	}

	return (
		<>
			<Snackbar
				open={successfullUpload}
				autoHideDuration={6000}
				onClose={() => setSuccessfullUpload(false)}>
				<Alert
					onClose={() => setSuccessfullUpload(false)}
					severity="success"
					sx={{ width: "100%" }}>
					Sucessfully Updated Profile!
				</Alert>
			</Snackbar>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					<AppBarMobile hasLogo profileButton>
						<Button
							onClick={goToCurrent}
							size="small"
							variant="outlined"
							startIcon={<PriorityHighRounded />}
							color="success">
							open current event
						</Button>
					</AppBarMobile>
					<DjEventDateListPage />
					<Box
						sx={{
							position: "fixed",
							bottom: 0,
							left: 0,
							right: 0,
							zIndex: "200",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							height: "70px",
						}}>
						<MessagingButton />
						<Paper
							square
							sx={{
								opacity: "0.9",
								width: "40%",
								height: "55px",
								borderRadius: "10px",
								overflow: "hidden",
							}}>
							<BottomNavigation
								showLabels
								value={selectedTab}
								onChange={handleSetTab}>
								<BottomNavigationAction
									value={1}
									label="gigs"
									icon={<CalendarMonthRounded />}
								/>
							</BottomNavigation>
						</Paper>
					</Box>
				</>
			)}
		</>
	);
}

export default DjHome;
