/** @format */
"use client";

import { useState, useEffect } from "react";
import DjEventPageV2pt0 from "./DjEventPageV2pt0";
import { useRouter } from "next/navigation";
import {
	DjEventPageType,
	getDjEventPageDataV2pt0,
} from "@/api_functions/getDjEventPageDataV2pt0";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage";
import DjEventDateModal from "../DjEventDateModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootStore";
import ResignAsDjModal from "./ResignAsDjModal";
import { deleteDjResignFromBaseEvent } from "@/api_functions/DjResignDrop";

interface DjEventPageV2pt0ContainerProps {
	baseEventIdFromParams: string;
}

function DjEventPageV2pt0Container({
	baseEventIdFromParams,
}: DjEventPageV2pt0ContainerProps) {
	const router = useRouter();

	const [pageData, setPageData] = useState<DjEventPageType | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [confirmEventQuit, setConfirmEventQuit] = useState(false);
	const [isDroppingOrResigning, setIsDroppingOrResigning] = useState(false);

	const selectedDate = useSelector(
		(state: RootState) => state.DjEventDateListV2pt0Slice.modalIsOpen
	);

	async function initPage() {
		if (baseEventIdFromParams) {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];
			const userRoleIdAsNumber =
				typeof roleId === "number" ? roleId : Number(roleId);

			getDjEventPageDataV2pt0({
				request_base_event_id: baseEventIdFromParams,
				request_dj_id: userRoleIdAsNumber,
			}).then((data) => {
				if (data) {
					setPageData(data);
				}
			});
		}
	}

	useEffect(() => {
		initPage().then(() => setIsLoading(false));
	}, []);

	function handleBack() {
		router.back();
	}

	async function handleResignAsDj() {
		if (baseEventIdFromParams) {
			setIsDroppingOrResigning(true);
			const currentUser = await Auth.currentAuthenticatedUser();
			const displayName = currentUser.attributes["custom:DisplayUsername"];
			deleteDjResignFromBaseEvent(baseEventIdFromParams, displayName).then(
				(response) => {
					console.log("response", response);
					if (response.message === "Success") {
						router.push("/dj");
					}
				}
			);
		}
	}

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{pageData ? (
						<>
							{selectedDate ? (
								<DjEventDateModal selectedDate={selectedDate} />
							) : null}
							{confirmEventQuit ? (
								<ResignAsDjModal
									isDroppingOrResigning={isDroppingOrResigning}
									handleResignAsDj={handleResignAsDj}
									handleCloseModal={() => setConfirmEventQuit(false)}
								/>
							) : null}
							<DjEventPageV2pt0
								handleBack={handleBack}
								pageData={pageData}
								setConfirmEventQuit={setConfirmEventQuit}
							/>
						</>
					) : null}
				</>
			)}
		</>
	);
}

export default DjEventPageV2pt0Container;
