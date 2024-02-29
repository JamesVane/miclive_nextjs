/** @format */
"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DJEventManagePage from "./DJEventManagePage";
import { getDjManageFullState } from "@/api_functions/getDjManageFullState";
import { RootState } from "@/app/LocalizationProviderHelper";
import { setAllDjManageEventSlice } from "@/store/djManageEventSlice";
import SplashPage from "@/SplashPage";
import _ from "lodash";
import styles from "./styles.module.css";

interface DjEventManageContainerProps {
	specificEventIdFromParams: string;
}

function DjEventManageContainer({
	specificEventIdFromParams,
}: DjEventManageContainerProps) {
	const dispatch = useDispatch();
	const DjManageState = useSelector((state: RootState) => state.djManageEvent);
	const [hasPulledData, setHasPulledData] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (DjManageState.base_event || !hasPulledData) {
			setIsLoading(true);
			getDjManageFullState(specificEventIdFromParams).then((response) => {
				setHasPulledData(true);
				setIsLoading(false);
				dispatch(setAllDjManageEventSlice(response));
			});
		} else {
			setIsLoading(false);
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<div className={styles.splash_container}>
					<SplashPage />
				</div>
			) : (
				<DJEventManagePage />
			)}
		</>
	);
}

export default DjEventManageContainer;
