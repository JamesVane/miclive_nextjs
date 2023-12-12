/** @format */
"use client";

import { useEffect, useState } from "react";
import PromoterCurrentEvent from "./PromoterCurrentEvent";
import { getPromoterManageCurrentEventData } from "@/api_functions/getPromoterManageCurrentEventData";
import { setPromoterManageState } from "@/store/PromoterManageEventState";
import { useDispatch, useSelector } from "react-redux";
import SplashPage from "@/SplashPage";
import { promoterGetQrAndKeyFromDynamo } from "@/api_functions/promoterGetQrAndKeyFromDynamo";

interface PromoterCurrentEventContainerProps {
	specificEventIdFromParams: string;
}

function PromoterCurrentEventContainer({
	specificEventIdFromParams,
}: PromoterCurrentEventContainerProps) {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [checkinUuidAndId, setCheckinUuidAndQr] = useState<{
		uuid: string;
		key: string;
	} | null>(null);

	async function handleQrAndId() {
		promoterGetQrAndKeyFromDynamo(specificEventIdFromParams).then((res) => {
			setCheckinUuidAndQr({
				uuid: res.qr_code_uuid,
				key: res.check_in_id,
			});
		});
	}

	useEffect(() => {
		if (isLoading) {
			handleQrAndId().then(() => {
				getPromoterManageCurrentEventData(specificEventIdFromParams!).then(
					(data) => {
						dispatch(setPromoterManageState(data));
						setIsLoading(false);
					}
				);
			});
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<PromoterCurrentEvent
					qrUuid={checkinUuidAndId ? checkinUuidAndId.uuid : ""}
					CheckinKey={checkinUuidAndId ? checkinUuidAndId.key : ""}
				/>
			)}
		</>
	);
}

export default PromoterCurrentEventContainer;
