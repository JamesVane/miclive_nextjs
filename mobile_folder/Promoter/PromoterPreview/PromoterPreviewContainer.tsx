/** @format */

import PromoterPreview from "./PromoterPreview";
import { useEffect, useState } from "react";
import {
	getPromoterPreviewPageDataV2pt0,
	PromoterPreviewData,
} from "@/api_functions/getPromoterPreviewPageDataV2pt0";
import SplashPage from "@/SplashPage";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import {
	setOpenConversationDesktop,
	setDrawerIsOpen,
} from "@/store/openConversationDesktopSlice";
import { setHoldNewConversationSlice } from "@/store/holdNewConversationSlice";

interface PromoterPreviewContainerProps {
	eventName: string;
}

function PromoterPreviewContainer({
	eventName,
}: PromoterPreviewContainerProps) {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [pageData, setPageData] = useState<PromoterPreviewData | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	async function initFunction() {
		try {
			const currentUser = await Auth.currentAuthenticatedUser();
			const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
			if (requestPerformerRoleId) {
				setIsAuthenticated(true);
			}
		} catch {
			setIsAuthenticated(false);
		}

		getPromoterPreviewPageDataV2pt0(eventName).then((data) => {
			setPageData(data);
			setIsLoading(false);
		});
	}

	useEffect(() => {
		initFunction();
	}, []);

	const conversationList = useSelector(
		(state: RootState) => state.conversationList
	);

	function handleMessage() {
		if (pageData) {
			const promoterUserSub = pageData.promoter_sub;
			const promoterName = pageData.promoter_name;
			const promoterRoleId = pageData.promoter_id;
			if (conversationList[promoterUserSub]) {
				dispatch(setOpenConversationDesktop(promoterUserSub));
				dispatch(setDrawerIsOpen(true));
			} else {
				dispatch(
					setHoldNewConversationSlice({
						userSub: promoterUserSub,
						name: promoterName,
						type: "promoter",
						roleId: promoterRoleId,
					})
				);
				dispatch(setOpenConversationDesktop(promoterUserSub));
				dispatch(setDrawerIsOpen(true));
			}
		}
	}

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{pageData ? (
						<PromoterPreview
							handleMessage={handleMessage}
							pageData={pageData}
							isAuth={isAuthenticated}
						/>
					) : null}
				</>
			)}
		</>
	);
}

export default PromoterPreviewContainer;
