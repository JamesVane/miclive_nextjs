/** @format */

import React, { useState, useEffect } from "react";
import PromoterEventListPage from "./PromoterEventListPage";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";

function PromoterEventListPageContainer() {
	const [viewportWidth, setViewportWidth] = useState<"three" | "two">("three");

	const eventListArray = useSelector(
		(state: RootState) => state.promoterEventListV2pt0Slice
	);

	useEffect(() => {
		function handleResize() {
			window.innerWidth < 1057
				? setViewportWidth("two")
				: setViewportWidth("three");
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<PromoterEventListPage
			viewportWidth={viewportWidth}
			eventListArray={eventListArray}
		/>
	);
}

export default PromoterEventListPageContainer;
