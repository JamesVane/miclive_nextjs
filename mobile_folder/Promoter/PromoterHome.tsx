/** @format */
"use client";

import { useEffect, useState } from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Paper,
	Box,
} from "@mui/material";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import AddBoxRounded from "@mui/icons-material/AddBoxRounded";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { setMobileTab } from "@/store/mobileTabSlice";
import PromoterEventListPage from "./PromoterEventListPage";
import { useRouter } from "next/navigation";
import _ from "lodash";
import SplashPage from "@/SplashPage";
import { Snackbar, Alert } from "@mui/material";
import { setToDefault } from "@/store/promoterCreateEventSlice";
import { Auth } from "aws-amplify";
import MessagingButton from "@mobi/Messaging/MessagingButton";
import { getPromoterEventListV2pt0 } from "@/api_functions/getPromoterEventListV2pt0";
import { setPromoterEventListV2pt0Slice } from "@/store/promoterEventListV2pt0Slice";

function PromoterHome() {
	const dispatch = useDispatch();
	const { tab } = useSelector((state: RootState) => state.mobileTab);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [successfullUpload, setSuccessfullUpload] = useState(false);

	function setTab(event: any, newValue: number) {
		router.push("/m/promoter");
		dispatch(setMobileTab(newValue));
	}

	useEffect(() => {
		if (tab === 0) {
			dispatch(setMobileTab(1));
			dispatch(setToDefault());
			router.push("/m/promoter/create");
		}
	}, [tab]);

	async function initFetch() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];

			getPromoterEventListV2pt0(roleId).then((res) => {
				if (res) {
					dispatch(setPromoterEventListV2pt0Slice(res));
				}
			});

			setIsLoading(false);
			setIsLoading(false);
		} catch (err) {
			console.log("Error fetching user profile or performer data");
		}
	}

	useEffect(() => {
		if (isLoading) {
			initFetch();
		}
	}, []);

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
				<div
					style={{
						width: "100%",
						height: "85vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<SplashPage />
				</div>
			) : (
				<>
					<PromoterEventListPage />
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
							sx={{
								opacity: "0.9",
								width: "40%",
								height: "55px",
								borderRadius: "10px",
								overflow: "hidden",
							}}>
							<BottomNavigation showLabels value={tab} onChange={setTab}>
								<BottomNavigationAction
									label="Create"
									icon={<AddBoxRounded />}
								/>
								<BottomNavigationAction
									label="Events"
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

export default PromoterHome;
