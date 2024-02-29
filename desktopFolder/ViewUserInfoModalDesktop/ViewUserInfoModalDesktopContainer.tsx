/** @format */
"use client";

import ViewUserInfoModalMobile from "./ViewUserInfoModalDesktop";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { setViewUserInfoModalSliceDefault } from "../../store/viewUserInfoModalSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setHoldNewConversationSlice } from "../../store/holdNewConversationSlice";
import {
	setOpenConversationDesktop,
	setDrawerIsOpen,
} from "../../store/openConversationDesktopSlice";

function ViewUserInfoModalDesktopContainer() {
	const dispatch = useDispatch();
	const router = useRouter();

	const { isOpen, roleId, userType, name, tagline, info, userSub } =
		useSelector((state: RootState) => state.viewUserInfoModalSlice);

	function handleClose() {
		dispatch(setViewUserInfoModalSliceDefault());
	}

	function handleNavigatePromoterPreview() {
		handleClose();
		router.push(`/promoter_info/${name}`);
	}

	const conversationList = useSelector(
		(state: RootState) => state.conversationList
	);

	function handleMessage() {
		if (conversationList[userSub]) {
			dispatch(setOpenConversationDesktop(userSub));
			dispatch(setDrawerIsOpen(true));
		} else {
			console.log("ele tan correctly");
			dispatch(
				setHoldNewConversationSlice({
					userSub: userSub,
					name: name,
					type: userType,
					roleId: roleId,
				})
			);
			dispatch(setOpenConversationDesktop(userSub));
			dispatch(setDrawerIsOpen(true));
		}
	}

	return (
		<>
			{isOpen ? (
				<ViewUserInfoModalMobile
					roleId={roleId}
					userType={userType}
					name={name}
					tagline={tagline}
					info={info}
					handleClose={handleClose}
					handleMessage={handleMessage}
					handleNavigatePromoterPreview={handleNavigatePromoterPreview}
				/>
			) : null}
		</>
	);
}

export default ViewUserInfoModalDesktopContainer;
