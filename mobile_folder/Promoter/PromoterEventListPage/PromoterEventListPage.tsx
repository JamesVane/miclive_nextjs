/** @format */

import styles from "./styles.module.css";
import AppBarMobile from "@mobi/AppBarMobile";
import NormalEventCard from "@mobi/NormalEventCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { PriorityHighRounded } from "@mui/icons-material";

function PromoterEventListPage() {
	const router = useRouter();

	const eventListArray = useSelector(
		(state: RootState) => state.promoterEventListV2pt0Slice
	);

	function goToCurrent() {
		router.push("/m/promoter/manage_event/145");
	}

	return (
		<>
			<AppBarMobile profileButton hasLogo>
				<Button
					onClick={goToCurrent}
					size="small"
					variant="outlined"
					startIcon={<PriorityHighRounded />}
					color="success">
					open current event
				</Button>
			</AppBarMobile>
			<div className={styles.list_container}>
				{eventListArray.map((event) => (
					<NormalEventCard
						key={event.base_event_id}
						isForPromoter
						baseEventId={event.base_event_id}
						eventTalgine={event.event_tagline}
						eventName={event.event_name}
					/>
				))}
			</div>
		</>
	);
}

export default PromoterEventListPage;
