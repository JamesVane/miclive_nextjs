/** @format */

import { useState } from "react";
import EditEventFourBannerMobile from "./EditEventFourBannerMobile";
import EditEventThreeBannerMobile from "./EditEventThreeBannerMobile";
import EditEventBothBannersSelectedMobile from "./EditEventBothBannersSelectedMobile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { Crop } from "react-image-crop";
import {
	setEditBanner4X10DisplayHelp,
	setEditBanner3X10DisplayHelp,
	setBanner4X10,
	setBanner3X10,
} from "@/store/promoterEditEventSlice";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { setSrc } from "@/store/imgStore";
import { imgRequestQueue } from "@/utilityFunctions/requestQueue";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

interface EditBaseEventBannerMobileProps {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<1 | 2>>;
	handleExit: () => void;
}

function EditBaseEventBannerMobile({
	page,
	setPage,
	handleExit,
}: EditBaseEventBannerMobileProps) {
	const dispatch = useDispatch();

	const {
		banner3X10DisplayHelp,
		banner4X10DisplayHelp,
		banner3X10,
		banner4X10,
	} = useSelector((state: RootState) => state.promoterEditEvent);

	const baseEventId = useSelector(
		(state: RootState) =>
			state.PromoterEventPageV2pt0Slice.event_data.base_event_id
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

	const [cropSelectStateBanner, setCropSelectStateBanner] = useState<State>(
		defaultCropSelectStateBanner
	);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadingError, setUploadingError] = useState(false);

	const bothConfirmed =
		banner3X10DisplayHelp.confirmImage && banner4X10DisplayHelp.confirmImage;
	const threeDisplay = banner3X10DisplayHelp.displayURL;
	const fourDisplay = banner4X10DisplayHelp.displayURL;

	function selectDifferentHandle() {
		dispatch(
			setEditBanner3X10DisplayHelp({ key: "imageSelected", value: false })
		);
		dispatch(setEditBanner3X10DisplayHelp({ key: "displayName", value: null }));
		dispatch(setEditBanner3X10DisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBanner3X10(null));
		dispatch(
			setEditBanner3X10DisplayHelp({ key: "confirmImage", value: false })
		);
		dispatch(
			setEditBanner4X10DisplayHelp({ key: "imageSelected", value: false })
		);
		dispatch(setEditBanner4X10DisplayHelp({ key: "displayName", value: null }));
		dispatch(setEditBanner4X10DisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBanner4X10(null));
		dispatch(
			setEditBanner4X10DisplayHelp({ key: "confirmImage", value: false })
		);
		setCropSelectStateBanner(defaultCropSelectStateBanner);
		setPage(1);
	}

	async function postBanner(
		size: "3" | "4",
		croppedImage: any
	): Promise<boolean> {
		try {
			if (baseEventId) {
				const res = await postUploadS3Image(
					croppedImage,
					`event_banner_${size}X1/banner_${baseEventId}`
				);
				if (res.data.message == "Image uploaded successfully") {
					imgRequestQueue.add(async () => {
						try {
							const signedUrl = await getSignedUrl(
								`event${size}X1`,
								baseEventId.toString()
							);
							if (signedUrl) {
								dispatch(
									setSrc({
										type: `event${size}X1`,
										id: baseEventId.toString(),
										url: signedUrl,
									})
								);
							}
						} catch (error: any) {
							throw new Error("Error fetching signed URL:", error);
						}
					});
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch (error: any) {
			return false;
		}
	}

	function handleFinished() {
		if (!isUploading) {
			selectDifferentHandle();
			handleExit();
		}
	}

	async function handleUploadBanner() {
		setIsUploading(true);
		try {
			const [bannerThreeResponse, bannerFourResponse] = await Promise.all([
				postBanner("3", banner3X10),
				postBanner("4", banner4X10),
			]);

			if (bannerThreeResponse === true && bannerFourResponse === true) {
				setUploadingError(false);
				setIsUploading(false);
				handleFinished();
			} else {
				setUploadingError(false);
				setIsUploading(false);
			}
		} catch (error) {
			setUploadingError(true);
			setIsUploading(false);
		}
	}

	return (
		<>
			{bothConfirmed ? (
				<EditEventBothBannersSelectedMobile
					handleUploadBanner={handleUploadBanner}
					isUploading={isUploading}
					threeDisplay={threeDisplay ? threeDisplay : ""}
					fourDisplay={fourDisplay ? fourDisplay : ""}
					selectDifferentHandle={selectDifferentHandle}
					fileName={
						banner4X10DisplayHelp.displayName
							? banner4X10DisplayHelp.displayName
							: ""
					}
				/>
			) : (
				<>
					{page === 1 ? (
						<EditEventFourBannerMobile
							cropSelectStateBanner={cropSelectStateBanner}
							setCropSelectStateBanner={setCropSelectStateBanner}
							selectDifferentHandle={selectDifferentHandle}
							nextPage={() => {
								setPage(2);
								setCropSelectStateBanner((prev) => {
									return {
										...prev,
										crop: {
											...prev.crop,
											width: 150,
											height: 50,
											aspect: 3 / 1,
											minWidth: 30,
											minHeight: 10,
											maxWidth: 1500,
											maxHeight: 500,
										},
									};
								});
							}}
						/>
					) : page === 2 ? (
						<EditEventThreeBannerMobile
							selectDifferentHandle={selectDifferentHandle}
							cropSelectStateBanner={cropSelectStateBanner}
							setCropSelectStateBanner={setCropSelectStateBanner}
						/>
					) : null}
				</>
			)}
		</>
	);
}

export default EditBaseEventBannerMobile;
