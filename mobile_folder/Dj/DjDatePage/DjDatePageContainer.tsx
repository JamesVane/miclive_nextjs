/** @format */
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DjDatePage from "./DjDatePage";
import { getDjEventDateModalInfoV2pt0 } from "@/api_functions/getDjEventDateModalInfoV2pt0";
import { getDjEventDateList } from "@/api_functions/getDjEventDateList";
import { setDjEventDateList } from "@/store/DjEventDateListV2pt0Slice";
import { useRouter } from "next/navigation";
import {
	setDjEventDateModalDataV2pt0ForTheirEvent,
	setDjEventDateModalDataV2pt0ForNOTTheirEvent,
} from "@/store/djEventDateModalDataV2pt0";
import { getSingleDateForNotPerformer } from "@/api_functions/getSingleDateForNotPerformer";
import SplashPage from "@/SplashPage";
import { Auth } from "aws-amplify";
import DropDateModalMobile from "./DropDateModalMobile";
import { deleteDjDropEventDate } from "@/api_functions/DjResignDrop";
import { RootState } from "@/app/LocalizationProviderHelper";

interface DjDatePageContainerProps {
	isDjForEvent?: boolean;
	specificEventIdFromParams: string;
}

function DjDatePageContainer({
	isDjForEvent,
	specificEventIdFromParams,
}: DjDatePageContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [dropDateModalOpen, setDropDateModalOpen] = useState(false);
	const [droppingOrResigning, setDroppingOrResigning] = useState(false);

	function handleNavigateBack() {
		router.back();
	}

	const { base_event_id, specific_event_id } = useSelector(
		(state: RootState) => state.djEventDateModalDataV2pt0
	);

	function initPage() {
		if (isDjForEvent) {
			getDjEventDateModalInfoV2pt0(Number(specificEventIdFromParams)).then(
				(returnedData) => {
					if (returnedData) {
						dispatch(setDjEventDateModalDataV2pt0ForTheirEvent(returnedData));
					}
					setIsLoading(false);
				}
			);
		} else {
			getSingleDateForNotPerformer(specificEventIdFromParams, false).then(
				(returnedData) => {
					if (returnedData) {
						dispatch(
							setDjEventDateModalDataV2pt0ForNOTTheirEvent(returnedData.data)
						);
					}
					setIsLoading(false);
				}
			);
		}
	}

	useEffect(() => {
		setIsLoading(true);
		initPage();
	}, []);

	async function handleDropDate() {
		setDroppingOrResigning(true);
		const currentUser = await Auth.currentAuthenticatedUser();
		const displayName = currentUser.attributes["custom:DisplayUsername"];
		const djRoleId = currentUser.attributes["custom:RoleId"];
		deleteDjDropEventDate({
			request_base_event_id: base_event_id.toString(),
			request_specific_event_id: specific_event_id.toString(),
			request_dj_name: displayName,
		}).then((response) => {
			if (response.message === "Success") {
				getDjEventDateList(djRoleId).then((response) => {
					if (response) {
						dispatch(setDjEventDateList(response));
						handleNavigateBack();
					}
				});
			}
		});
	}

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{dropDateModalOpen ? (
						<DropDateModalMobile
							handleDropDate={handleDropDate}
							isDroppingOrResigning={droppingOrResigning}
							handleCloseModal={() => setDropDateModalOpen(false)}
						/>
					) : null}
					<DjDatePage
						handleNavigateBack={handleNavigateBack}
						setDropDateModalOpen={setDropDateModalOpen}
					/>
				</>
			)}
		</>
	);
}

export default DjDatePageContainer;
