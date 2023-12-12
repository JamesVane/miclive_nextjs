/** @format */

import { useState } from "react";
import AddProfileBanner from "./AddProfileBanner";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useSessionState } from "@/custom_hooks/useSessionState";
import {
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	setBanner4X10,
	setBanner3X10,
} from "@/store/createAccountSlice";
import { RootState } from "@/store/rootStore";

function AddProfileBannerContainer() {
	const dispatch = useDispatch();
	const router = useRouter();

	const { banner3X10DisplayHelp, banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.createAccount
	);

	const [page, setPage] = useSessionState("page", 1);
	const [threeByFoursrc, setThreeByFoursrc] = useState<any>(null);

	const bothConfirmed =
		banner3X10DisplayHelp.confirmImage && banner4X10DisplayHelp.confirmImage;
	const buttonsAndCrumbsNOTDisplayed = !bothConfirmed && threeByFoursrc;

	const threeDisplay = banner3X10DisplayHelp.displayURL;
	const fourDisplay = banner4X10DisplayHelp.displayURL;

	function goToNextStep() {
		router.push("/add_more_info/promoter");
	}

	function handleBack() {
		router.push("/add_more_info/promoter");
	}

	function selectDifferentHandle() {
		dispatch(setBanner3X10DisplayHelp({ key: "imageSelected", value: false }));
		dispatch(setBanner3X10DisplayHelp({ key: "displayName", value: null }));
		dispatch(setBanner3X10DisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBanner3X10(null));
		dispatch(setBanner3X10DisplayHelp({ key: "confirmImage", value: false }));

		dispatch(setBanner4X10DisplayHelp({ key: "imageSelected", value: false }));
		dispatch(setBanner4X10DisplayHelp({ key: "displayName", value: null }));
		dispatch(setBanner4X10DisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBanner4X10(null));
		dispatch(setBanner4X10DisplayHelp({ key: "confirmImage", value: false }));
		setThreeByFoursrc(null);
		setPage(1);
	}

	return (
		<AddProfileBanner
			goToNextStep={goToNextStep}
			handleBack={handleBack}
			page={page}
			setPage={setPage}
			selectDifferentHandle={selectDifferentHandle}
			setThreeByFoursrc={setThreeByFoursrc}
			threeByFoursrc={threeByFoursrc}
			bothConfirmed={bothConfirmed}
			buttonsAndCrumbsNOTDisplayed={buttonsAndCrumbsNOTDisplayed}
			threeDisplay={threeDisplay ? threeDisplay : ""}
			fourDisplay={fourDisplay ? fourDisplay : ""}
			banner4X10DisplayHelpDisplayName={
				banner4X10DisplayHelp.displayName
					? banner4X10DisplayHelp.displayName
					: ""
			}
		/>
	);
}

export default AddProfileBannerContainer;
