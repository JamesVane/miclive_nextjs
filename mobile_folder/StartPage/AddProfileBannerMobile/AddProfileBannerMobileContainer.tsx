/** @format */

import { useState } from "react";
import AddProfileBannerMobile from "./AddProfileBannerMobile";
import { useSessionState } from "../../../custom_hooks/useSessionState";
import { useDispatch, useSelector } from "react-redux";
import {
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	setBanner4X10,
	setBanner3X10,
} from "../../../store/createAccountSlice";
import { Crop } from "react-image-crop";
import { RootState } from "../../../store/rootStore";
import { useRouter } from "next/navigation";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

function AddProfileBannerMobileContainer() {
	const dispatch = useDispatch();
	const router = useRouter();

	const { banner3X10DisplayHelp, banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.createAccount
	);

	const defaultCropSelectStateBanner = {
		src: null,
		crop: {
			x: 0,
			y: 0,
			width: 200,
			height: 50,
			aspect: 4 / 1,
			unit: "px",
			minWidth: 40,
			minHeight: 10,
			maxWidth: 2000,
			maxHeight: 500,
		} as Crop,
		croppedImageUrl: null,
	};

	const [page, setPage] = useSessionState("page", 1);
	const [cropSelectStateBanner, setCropSelectStateBanner] = useState<State>(
		defaultCropSelectStateBanner
	);

	const threeDisplay = banner3X10DisplayHelp.displayURL;
	const fourDisplay = banner4X10DisplayHelp.displayURL;
	const bothConfirmed =
		banner3X10DisplayHelp.confirmImage && banner4X10DisplayHelp.confirmImage;
	const buttonsAndCrumbsNOTDisplayed =
		!bothConfirmed && cropSelectStateBanner.src ? true : false;

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
		setCropSelectStateBanner(defaultCropSelectStateBanner);
		setPage(1);
	}

	function handleBack() {
		router.push("/m/dd_info/promoter");
	}

	function goToNextStep() {
		router.push("/m/add_more_info/promoter");
	}

	function handleNextPage() {
		setPage(2);
		setCropSelectStateBanner((prev) => {
			return {
				...prev,
				crop: {
					...prev.crop,
					width: 150,
					aspect: 3 / 1,
					minWidth: 30,
					maxWidth: 1500,
				},
			};
		});
	}

	return (
		<AddProfileBannerMobile
			goToNextStep={goToNextStep}
			handleNextPage={handleNextPage}
			handleBack={handleBack}
			buttonsAndCrumbsNOTDisplayed={buttonsAndCrumbsNOTDisplayed}
			bothConfirmed={bothConfirmed}
			page={page}
			selectDifferentHandle={selectDifferentHandle}
			cropSelectStateBanner={cropSelectStateBanner}
			setCropSelectStateBanner={setCropSelectStateBanner}
			banner4X10DisplayHelpDisplayName={
				banner4X10DisplayHelp.displayName
					? banner4X10DisplayHelp.displayName
					: ""
			}
			threeDisplay={threeDisplay ? threeDisplay : ""}
			fourDisplay={fourDisplay ? fourDisplay : ""}
		/>
	);
}

export default AddProfileBannerMobileContainer;
