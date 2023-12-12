/** @format */

import React from "react";
import styles from "./styles.module.css";
import SplashPage from "@/SplashPage";

interface EventDateModalSplashProps {
	handleClose: () => void;
}

function EventDateModalSplash({ handleClose }: EventDateModalSplashProps) {
	return (
		<div className={styles.main_div} onClick={handleClose}>
			<div
				className={styles.inner_div}
				style={{ width: "575px" }}
				onClick={(event) => {
					event.stopPropagation();
				}}>
				<SplashPage />
			</div>
		</div>
	);
}

export default EventDateModalSplash;
