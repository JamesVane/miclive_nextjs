/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Divider, Button } from "@mui/material";
import CreateThreeBanner from "./CreateThreeBanner";
import CreateFourbanner from "./CreateFourbanner";
import BothBannersSelected from "./BothBannersSelected";
import {
	ArrowForwardIosRounded,
	ArrowBackIosRounded,
} from "@mui/icons-material";

interface AddProfileBannerProps {
	goToNextStep: () => void;
	handleBack: () => void;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	selectDifferentHandle: () => void;
	setThreeByFoursrc: React.Dispatch<React.SetStateAction<any>>;
	threeByFoursrc: any;
	bothConfirmed: boolean;
	buttonsAndCrumbsNOTDisplayed: boolean;
	threeDisplay: string;
	fourDisplay: string;
	banner4X10DisplayHelpDisplayName: string;
}

function AddProfileBanner({
	goToNextStep,
	handleBack,
	setPage,
	page,
	selectDifferentHandle,
	setThreeByFoursrc,
	threeByFoursrc,
	bothConfirmed,
	buttonsAndCrumbsNOTDisplayed,
	threeDisplay,
	fourDisplay,
	banner4X10DisplayHelpDisplayName,
}: AddProfileBannerProps) {
	return (
		<div className={styles.main_div}>
			<div className={styles.paper_container}>
				<div className={styles.header_div}>
					{page === 1 ? "Large Banner" : page === 2 ? "Small Banner" : null}
				</div>
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
				<div
					className={styles.banner_body_div}
					style={{
						height: buttonsAndCrumbsNOTDisplayed
							? "calc(100% - 57px)"
							: "calc(100% - 105px)",
					}}>
					{bothConfirmed ? (
						<BothBannersSelected
							fileName={banner4X10DisplayHelpDisplayName}
							selectDifferentHandle={selectDifferentHandle}
							threeDisplay={threeDisplay ? threeDisplay : ""}
							fourDisplay={fourDisplay ? fourDisplay : ""}
						/>
					) : (
						<>
							{page === 1 ? (
								<CreateFourbanner
									selectDifferentHandle={selectDifferentHandle}
									setThreeByFoursrc={setThreeByFoursrc}
									nextPage={() => {
										setPage(2);
									}}
								/>
							) : page === 2 ? (
								<CreateThreeBanner
									selectDifferentHandle={selectDifferentHandle}
									holdSrc={threeByFoursrc}
								/>
							) : null}
						</>
					)}
				</div>

				{buttonsAndCrumbsNOTDisplayed ? null : (
					<>
						<Button
							onClick={handleBack}
							color="secondary"
							/* onClick={() => dispatch(switchPage({ page: "baseEventDescription" }))} */
							startIcon={<ArrowBackIosRounded />}
							variant="outlined"
							sx={{ position: "absolute", left: 10, bottom: 10 }}>
							Back
						</Button>
						<Button
							onClick={goToNextStep}
							disabled={!bothConfirmed}
							/* onClick={() => dispatch(switchPage({ page: "baseEventDescription" }))} */
							endIcon={<ArrowForwardIosRounded />}
							variant="outlined"
							sx={{ position: "absolute", right: 10, bottom: 10 }}>
							Continue
						</Button>
					</>
				)}
			</div>
		</div>
	);
}

export default AddProfileBanner;
