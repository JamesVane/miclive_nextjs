/** @format */
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { CheckRounded } from "@mui/icons-material";
import { RootState } from "@/store/rootStore";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { Button, Paper } from "@mui/material";
import { setIsTimedOutState } from "../store/isTimedOutSlice";
import { setCurrentSub as setCurrentSubSlice } from "@/store/currentSubStore";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();

	const isTimedOutSate = useSelector(
		(state: RootState) => state.isTimedOutSlice
	);

	function handleSetCurrentSub(value: string | null) {
		dispatch(setCurrentSubSlice(value));
	}

	async function reloadAfterTimeout() {
		const user = await Auth.currentAuthenticatedUser();
		const userId = user.attributes.sub;
		dispatch(setIsTimedOutState(false));
		handleSetCurrentSub(userId);
	}

	return (
		<>
			{isTimedOutSate ? (
				<div
					style={{
						zIndex: 5000,
						position: "fixed",
						top: "0",
						left: "0",
						right: "0",
						width: "100vw",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(0,0,0,0.5)",
						flexDirection: "column",
					}}>
					<Paper
						sx={{
							textAlign: "center",
							width: "85vw",
							height: "250px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<h1 style={{ color: "white" }}>Your Session Has Been Timed Out</h1>
						<Button
							startIcon={<CheckRounded />}
							onClick={reloadAfterTimeout}
							size="large"
							variant="outlined">
							Check In
						</Button>
					</Paper>
				</div>
			) : null}
			{children}
		</>
	);
}

export default LayoutWrapper;
