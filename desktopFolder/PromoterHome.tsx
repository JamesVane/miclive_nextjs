/** @format */
"use client";

import { useState, useEffect } from "react";
import SplashPage from "@/SplashPage";
import { WarningRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import _ from "lodash";
import HomeBarV2 from "@desk/HomeBarV2";
import { Tabs, Tab, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { setToDefaultDate } from "@/store/CreateEventDateSlice";
import PromoterEventListPage from "@desk/performer_dj_promoter/promoter/PromoterEventListPage";
import { getPromoterEventListV2pt0 } from "@/api_functions/getPromoterEventListV2pt0";
import { setPromoterEventListV2pt0Slice } from "@/store/promoterEventListV2pt0Slice";
import { getNextUpEvent } from "@/api_functions/getNextUpEvent";

function PromoterHome() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [promoterNav, setPromoterNav] = useState<"create" | "event">("event");
	const [nextUpEventId, setNextUpEventId] = useState<number | null>(null);

	function setSelectedNav(value: "create" | "event") {
		setPromoterNav(value);
		if (value === "create") {
			router.push("/promoter/create");
		}
		if (value === "event") {
			router.push("/promoter");
		}
	}

	useEffect(() => {
		if (location.pathname === "/promoter/create") {
			setPromoterNav("create");
		}
		if (location.pathname === "/promoter") {
			setPromoterNav("event");
		}
	}, [location]);

	useEffect(() => {
		async function fetchData() {
			try {
				const nextUpEventReturnData = await getNextUpEvent();
				if (nextUpEventReturnData.event_id) {
					setNextUpEventId(nextUpEventReturnData.event_id);
				}

				getPromoterEventListV2pt0().then((res) => {
					if (res) {
						dispatch(setPromoterEventListV2pt0Slice(res));
					}
				});

				setIsLoading(false);
			} catch (err) {
				console.log("Error fetching user profile or performer data");
			}
		}

		fetchData();
	}, []);

	function handleManageEvent() {
		router.push(`/promoter/manage_event/${nextUpEventId}`);
	}

	return (
		<>
			<HomeBarV2 hasProfile={true}>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
					}}>
					<Tabs
						value={promoterNav}
						onChange={(
							event: React.SyntheticEvent,
							newValue: "create" | "event"
						) => setSelectedNav(newValue)}
						textColor="primary"
						indicatorColor="primary">
						<Tab
							value="create"
							label="Create Event"
							sx={{ fontSize: "25px" }}
						/>
						<Tab value="event" label="My Events" sx={{ fontSize: "25px" }} />
					</Tabs>
					<Button
						disabled={nextUpEventId === null}
						onClick={handleManageEvent}
						sx={{ marginLeft: "20px", marginBottom: "7.5px" }}
						color="success"
						variant="outlined"
						startIcon={<WarningRounded />}>
						manage current event
					</Button>
				</div>
			</HomeBarV2>

			<div
				style={{
					marginTop: "70px",
					width: "100vw",
					height: "calc(100vh - 70px)",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
				}}>
				{isLoading ? <SplashPage /> : <PromoterEventListPage />}
			</div>
		</>
	);
}

export default PromoterHome;
