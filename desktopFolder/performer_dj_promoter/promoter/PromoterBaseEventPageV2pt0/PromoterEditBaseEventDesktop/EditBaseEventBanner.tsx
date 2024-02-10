/** @format */

import { useState } from "react";
// import { useSessionState } from "@/custom_hooks/useSessionState";
import EditEventBannerFour from "./EditEventBannerFour";
import EditEventBannerThree from "./EditEventBannerThree";
import EditEventBannerBothSelected from "./EditEventBannerBothSelected";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import {
	setEditBanner4X10DisplayHelp,
	setEditBanner3X10DisplayHelp,
	setBanner4X10,
	setBanner3X10,
} from "@/store/promoterEditEventSlice";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";
import { setSrc } from "@/store/imgStore";

interface EditBaseEventBannerProps {
	handleExit: () => void;
}

function EditBaseEventBanner({ handleExit }: EditBaseEventBannerProps) {
	const dispatch = useDispatch();

	const [isUploading, setIsUploading] = useState(false);
	const [uploadingError, setUploadingError] = useState(false);

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

	const threeDisplay = banner3X10DisplayHelp.displayURL;
	const fourDisplay = banner4X10DisplayHelp.displayURL;

	// const [page, setPage] = useSessionState<1 | 2>("EditBannerPageDesktop", 1);
	const [page, setPage] = useState<1 | 2>(1);

	const [threeByFoursrc, setThreeByFoursrc] = useState<any>(null);
	/* const [threeByFoursrc, setThreeByFoursrc] = useSessionState<any>(
		"editEventBannerThreeByFoursrcDestop",
		null
	); */

	const bothConfirmed =
		banner3X10DisplayHelp.confirmImage && banner4X10DisplayHelp.confirmImage;

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
		setThreeByFoursrc(null);
		setPage(1);
	}

	function handleClickBack() {
		if (!isUploading) {
			selectDifferentHandle();
			handleExit();
		}
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
				handleClickBack();
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
		<div className={styles.banner_edit_main_div}>
			<div className={styles.banner_head}>
				<Button
					disabled={isUploading}
					onClick={handleClickBack}
					color="secondary"
					sx={{
						position: "absolute",
						top: "0px",
						left: "0px",
					}}
					startIcon={<ArrowBackIosRounded />}
					size="small">
					back
				</Button>
				{bothConfirmed
					? "Confirm New banner"
					: page === 1
					? "Large Banner"
					: page === 2
					? "Small Banner"
					: ""}
			</div>
			{bothConfirmed ? (
				<EditEventBannerBothSelected
					handleUploadBanner={handleUploadBanner}
					isUploading={isUploading}
					fileName={
						banner4X10DisplayHelp.displayName
							? banner4X10DisplayHelp.displayName
							: ""
					}
					selectDifferentHandle={selectDifferentHandle}
					threeDisplay={threeDisplay ? threeDisplay : ""}
					fourDisplay={fourDisplay ? fourDisplay : ""}
				/>
			) : (
				<>
					{page === 1 ? (
						<EditEventBannerFour
							setThreeByFoursrc={setThreeByFoursrc}
							selectDifferentHandle={selectDifferentHandle}
							nextPage={() => {
								setPage(2);
							}}
						/>
					) : page === 2 ? (
						<EditEventBannerThree
							selectDifferentHandle={selectDifferentHandle}
							holdSrc={threeByFoursrc}
						/>
					) : null}
				</>
			)}
		</div>
	);
}

export default EditBaseEventBanner;
