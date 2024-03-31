/** @format */

import { useState, useEffect } from "react";
import DjEventDateModal from "./DjEventDateModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { getDjEventDateModalInfoV2pt0 } from "@/api_functions/getDjEventDateModalInfoV2pt0";
import {
	setDjEventDateModalDataV2pt0ForTheirEvent,
	setDjEventDateModalDataV2pt0ForNOTTheirEvent,
} from "@/store/djEventDateModalDataV2pt0";
import SplashPage from "@/SplashPage";
import styles from "./styles.module.css";
import { setModalNumberIsDj } from "@/store/DjEventDateListV2pt0Slice";
import { getSingleDateForNotPerformer } from "@/api_functions_no_auth/getSingleDateForNotPerformer";
import DropDateModal from "./DropDateModal";
import { Auth } from "aws-amplify";
import { deleteDjDropEventDate } from "@/api_functions/DjResignDrop";
import { getDjEventDateList } from "@/api_functions/getDjEventDateList";
import { setDjEventDateList } from "@/store/DjEventDateListV2pt0Slice";

interface DjEventDateModalContainerProps {
	selectedDate: number;
}

function DjEventDateModalContainer({
	selectedDate,
}: DjEventDateModalContainerProps) {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [dropDateModalOpen, setDropDateModalOpen] = useState(false);
	const [droppingOrResigning, setDroppingOrResigning] = useState(false);

	const isDjForDate = useSelector(
		(state: RootState) => state.DjEventDateListV2pt0Slice.isDj
	);

	const { base_event_id, specific_event_id } = useSelector(
		(state: RootState) => state.djEventDateModalDataV2pt0
	);

	function handleClose() {
		dispatch(setModalNumberIsDj(null));
	}

	function initPage() {
		if (isDjForDate) {
			getDjEventDateModalInfoV2pt0(selectedDate).then((returnedData) => {
				if (returnedData) {
					dispatch(setDjEventDateModalDataV2pt0ForTheirEvent(returnedData));
				}
				setIsLoading(false);
			});
		} else {
			getSingleDateForNotPerformer(selectedDate.toString(), false).then(
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
		deleteDjDropEventDate({
			request_base_event_id: base_event_id.toString(),
			request_specific_event_id: specific_event_id.toString(),
			request_dj_name: displayName,
		}).then((response) => {
			if (response.message === "Success") {
				getDjEventDateList().then((response) => {
					if (response) {
						dispatch(setDjEventDateList(response));
						handleClose();
					}
				});
			}
		});
	}

	return (
		<>
			{dropDateModalOpen ? (
				<DropDateModal
					handleDropDate={handleDropDate}
					isDroppingOrResigning={droppingOrResigning}
					handleCloseModal={() => setDropDateModalOpen(false)}
				/>
			) : null}
			<div className={styles.main_div} onClick={handleClose}>
				<div
					className={styles.paper_div}
					onClick={(e) => e.stopPropagation()}
					style={{
						width: isDjForDate ? "850px" : "429px",
						flexDirection: isDjForDate ? "row" : "column",
					}}>
					{isLoading ? (
						<SplashPage />
					) : (
						<>
							<DjEventDateModal
								setDropDateModalOpen={setDropDateModalOpen}
								handleClose={handleClose}
								isDjForDate={isDjForDate}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default DjEventDateModalContainer;
