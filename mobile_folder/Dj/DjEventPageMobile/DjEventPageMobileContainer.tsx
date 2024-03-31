/** @format */
"use client";

import { useState, useEffect } from "react";
import DjEventPageMobile from "./DjEventPageMobile";
import { useRouter } from "next/navigation";
import {
	DjEventPageType,
	getDjEventPageDataV2pt0,
} from "@/api_functions_not_user/getDjEventPageDataV2pt0";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage/SplashPage";
import { deleteDjResignFromBaseEvent } from "@/api_functions/DjResignDrop";
import ResignAdDjModalMobile from "./ResignAdDjModalMobile";

interface DjEventPageMobileContainerProps {
	baseEventIdFromParams: string;
}

function DjEventPageMobileContainer({
	baseEventIdFromParams,
}: DjEventPageMobileContainerProps) {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [pageData, setPageData] = useState<DjEventPageType | null>(null);
	const [isDroppingOrResigning, setIsDroppingOrResigning] = useState(false);
	const [confirmEventQuit, setConfirmEventQuit] = useState(false);

	function handleBack() {
		router.back();
	}

	async function initPage() {
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

	async function handleResignAsDj() {
		setIsDroppingOrResigning(true);
		const currentUser = await Auth.currentAuthenticatedUser();
		const displayName = currentUser.attributes["custom:DisplayUsername"];
		deleteDjResignFromBaseEvent(baseEventIdFromParams, displayName).then(
			(response) => {
				console.log("response", response);
				if (response.message === "Success") {
					handleBack();
				}
			}
		);
	}

	useEffect(() => {
		initPage().then(() => setIsLoading(false));
	}, []);

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{pageData ? (
						<>
							{confirmEventQuit ? (
								<ResignAdDjModalMobile
									isDroppingOrResigning={isDroppingOrResigning}
									handleResignAsDj={handleResignAsDj}
									handleCloseModal={() => setConfirmEventQuit(false)}
								/>
							) : null}
							<DjEventPageMobile
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

export default DjEventPageMobileContainer;
