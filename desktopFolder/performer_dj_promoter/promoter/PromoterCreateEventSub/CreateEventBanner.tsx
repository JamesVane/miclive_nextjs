/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	ArrowBackIosRounded,
	ArrowForwardIosRounded,
} from "@mui/icons-material";
import { switchPage } from "@/store/promoterCreateEventSlice";
import CreateHeader from "./CreateHeader";
import CreateEventCrumbs from "./CreateEventCrumbs";
import { RootState } from "@/app/LocalizationProviderHelper";
import BannerThree from "./BannerThree";
import BannerFour from "./BannerFour";
import {
	setBanner4X10DisplayHelp,
	setBanner3X10DisplayHelp,
	setBaseEvent,
} from "@/store/promoterCreateEventSlice";
import BothBannersSelected from "./BothBannersSelected";

function CreateEventBanner() {
	const dispatch = useDispatch();
	const [page, setPage] = useState<1 | 2>(1);
	const [threeByFoursrc, setThreeByFoursrc] = useState<any>(null);

	const { banner3X10DisplayHelp, banner4X10DisplayHelp } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);
	const threeDisplay = banner3X10DisplayHelp.displayURL;
	const fourDisplay = banner4X10DisplayHelp.displayURL;

	const bothConfirmed =
		banner3X10DisplayHelp.confirmImage && banner4X10DisplayHelp.confirmImage;
	const buttonsAndCrumbsNOTDisplayed = !bothConfirmed && threeByFoursrc;

	function selectDifferentHandle() {
		dispatch(setBanner3X10DisplayHelp({ key: "imageSelected", value: false }));
		dispatch(setBanner3X10DisplayHelp({ key: "displayName", value: null }));
		dispatch(setBanner3X10DisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBaseEvent({ key: "banner3X10", value: null }));
		dispatch(setBanner3X10DisplayHelp({ key: "confirmImage", value: false }));

		dispatch(setBanner4X10DisplayHelp({ key: "imageSelected", value: false }));
		dispatch(setBanner4X10DisplayHelp({ key: "displayName", value: null }));
		dispatch(setBanner4X10DisplayHelp({ key: "displayURL", value: null }));
		dispatch(setBaseEvent({ key: "banner4X10", value: null }));
		dispatch(setBanner4X10DisplayHelp({ key: "confirmImage", value: false }));
		setThreeByFoursrc(null);
		setPage(1);
	}

	return (
		<div className={styles.banner_paper}>
			<>
				{buttonsAndCrumbsNOTDisplayed ? null : (
					<>
						<Button
							disabled={!bothConfirmed}
							onClick={() =>
								dispatch(switchPage({ page: "baseEventDescription" }))
							}
							endIcon={<ArrowForwardIosRounded />}
							variant="outlined"
							sx={{ position: "absolute", right: 10, bottom: 10 }}>
							Continue
						</Button>
						<Button
							onClick={() => dispatch(switchPage({ page: "baseEvent" }))}
							startIcon={<ArrowBackIosRounded />}
							variant="outlined"
							sx={{ position: "absolute", left: 10, bottom: 10 }}>
							Back
						</Button>
					</>
				)}
			</>
			<CreateHeader>
				<div className={styles.header_primary}>Event</div>Banner:{" "}
				<div
					className={
						banner4X10DisplayHelp.imageSelected
							? styles.banner_step_on
							: styles.banner_step_off
					}>
					Large
				</div>{" "}
				-{" "}
				<div
					className={
						banner3X10DisplayHelp.imageSelected
							? styles.banner_step_on
							: styles.banner_step_off
					}>
					Small
				</div>{" "}
				-{" "}
				<div
					className={
						bothConfirmed ? styles.banner_step_on : styles.banner_step_off
					}>
					Confirm
				</div>
			</CreateHeader>
			<div
				className={styles.banner_body}
				style={{
					height: buttonsAndCrumbsNOTDisplayed
						? "calc(100% - 50px)"
						: "calc(100% - 110px)",
				}}>
				{bothConfirmed ? (
					<BothBannersSelected
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
							<BannerFour
								selectDifferentHandle={selectDifferentHandle}
								setThreeByFoursrc={setThreeByFoursrc}
								nextPage={() => {
									setPage(2);
								}}
							/>
						) : page === 2 ? (
							<BannerThree
								selectDifferentHandle={selectDifferentHandle}
								holdSrc={threeByFoursrc}
							/>
						) : null}
					</>
				)}
			</div>
			{buttonsAndCrumbsNOTDisplayed ? null : <CreateEventCrumbs />}
		</div>
	);
}

export default CreateEventBanner;
