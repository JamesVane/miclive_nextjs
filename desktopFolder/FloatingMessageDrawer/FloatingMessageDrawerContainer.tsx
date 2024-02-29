/** @format */
"use client";

import FloatingMessageDrawer from "./FloatingMessageDrawer";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	setOpenConversationDesktop,
	setDrawerIsOpen,
} from "@/store/openConversationDesktopSlice";
import { useDispatch } from "react-redux";

function FloatingMessageDrawerContainer() {
	const dispatch = useDispatch();

	const { openConversationSub, drawerIsOpen } = useSelector(
		(state: RootState) => state.openConversationDesktopSlice
	);

	function handleOnClose() {
		dispatch(setOpenConversationDesktop("None"));
		dispatch(setDrawerIsOpen(false));
	}

	return (
		<FloatingMessageDrawer
			openConversationSub={openConversationSub}
			isOpen={drawerIsOpen}
			onClose={handleOnClose}
		/>
	);
}

export default FloatingMessageDrawerContainer;
