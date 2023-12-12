/** @format */

import NormalEventCard from "@mobi/NormalEventCard";
import styles from "./styles.module.css";
import { EventObject } from "@/api_functions/getPromoterPreviewPageDataV2pt0";

interface PromoterPreviewListHelperProps {
	eventsArray: EventObject[];
}

function PromoterPreviewListHelper({
	eventsArray,
}: PromoterPreviewListHelperProps) {
	return (
		<>
			{eventsArray.map((event) => (
				<NormalEventCard
					baseEventId={Number(event.base_event_id)}
					eventName={event.event_name}
					eventTalgine={event.event_tagline}
					key={event.base_event_id}
				/>
			))}
		</>
	);
}

export default PromoterPreviewListHelper;
