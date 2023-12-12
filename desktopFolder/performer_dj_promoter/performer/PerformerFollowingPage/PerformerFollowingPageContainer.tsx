/** @format */

import { useState, useEffect } from "react";
import PerformerFollowingPage from "./PerformerFollowingPage";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function PerformerFollowingPageContainer() {
	const followingArray = useSelector(
		(state: RootState) => state.performerFollowingArrayV2Slice
	);

	const [viewportWidth, setViewportWidth] = useState<"three" | "two">("three");

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
		<>
			<PerformerFollowingPage
				followingArray={followingArray}
				viewportWidth={viewportWidth}
			/>
		</>
	);
}

export default PerformerFollowingPageContainer;
