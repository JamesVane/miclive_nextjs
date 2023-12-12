/** @format */

import ViewUserInfoModalMobile from "./ViewUserInfoModalMobile";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { setViewUserInfoModalSliceDefault } from "@/store/viewUserInfoModalSlice";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { setHoldNewConversationSlice } from "@/store/holdNewConversationSlice";

function ViewUserInfoModalMobileContainer() {
	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();

	const { isOpen, roleId, userType, name, tagline, info, userSub } =
		useSelector((state: RootState) => state.viewUserInfoModalSlice);

	function handleClose() {
		dispatch(setViewUserInfoModalSliceDefault());
	}

	function handleNavigatePromoterPreview() {
		handleClose();
		router.push(`/m/promoter_info/${name}`, {
			state: { from: pathname },
		});
	}

	const conversationList = useSelector(
		(state: RootState) => state.conversationList
	);

	function handleMessage() {
		if (conversationList[userSub]) {
			router.push(`${pathname}/direct/${userSub}`);
		} else {
			dispatch(
				setHoldNewConversationSlice({
					userSub: userSub,
					name: name,
					type: userType,
					roleId: roleId,
				})
			);
			router.push(`${pathname}/direct/${userSub}`);
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

export default ViewUserInfoModalMobileContainer;
