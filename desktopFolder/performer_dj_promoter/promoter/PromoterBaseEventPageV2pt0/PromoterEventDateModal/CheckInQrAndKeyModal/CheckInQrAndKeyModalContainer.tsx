/** @format */

import { useState, useEffect } from "react";
import { promoterGetQrAndKeyFromDynamo } from "@/api_functions/promoterGetQrAndKeyFromDynamo";
import CheckInQrAndKeyModal from "./CheckInQrAndKeyModal";
import SplashPage from "@/SplashPage";
import styles from "./styles.module.css";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";

interface CheckInQrAndKeyModalContainerProps {
	closeModal: () => void;
	specificEventId: string;
	startTime: number;
	eventName: string;
}

function CheckInQrAndKeyModalContainer({
	closeModal,
	specificEventId,
	startTime,
	eventName,
}: CheckInQrAndKeyModalContainerProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [checkinUuidAndId, setCheckinUuidAndQr] = useState<{
		uuid: string;
		key: string;
	} | null>(null);

	async function handleQrAndId() {
		promoterGetQrAndKeyFromDynamo(specificEventId).then((res) => {
			setCheckinUuidAndQr({
				uuid: res.qr_code_uuid,
				key: res.check_in_id,
			});
		});
	}

	function epochSecondsToMillis(epochSeconds: number): number {
		return epochSeconds * 1000;
	}

	function formatDate(epochMillis: number): string {
		const date = new Date(epochMillis);
		const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-based
		const day = String(date.getDate()).padStart(2, "0");
		const year = date.getFullYear();

		return `${month}-${day}-${year}`;
	}

	function handleDownload() {
		if (checkinUuidAndId) {
			getSignedUrl("qr", checkinUuidAndId.uuid).then(async (res) => {
				const formattedDate = formatDate(epochSecondsToMillis(startTime));
				if (res) {
					const signedURL = res;

					const response = await fetch(signedURL);
					console.log("fetched thing:", response);
					const blob = await response.blob();
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.style.display = "none";
					a.href = url;
					a.download = `${eventName}-${formattedDate}.png`;
					document.body.appendChild(a);
					a.click();
					window.URL.revokeObjectURL(url);
				} else console.log("FAILURE");
			});
		}
	}

	useEffect(() => {
		handleQrAndId().then(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.main_div} onClick={closeModal}>
			<div className={styles.paper_div} onClick={(e) => e.stopPropagation()}>
				{isLoading ? (
					<SplashPage />
				) : (
					<CheckInQrAndKeyModal
						uuid={checkinUuidAndId?.uuid ? checkinUuidAndId.uuid : ""}
						checkinKey={checkinUuidAndId?.key ? checkinUuidAndId.key : ""}
						closeModal={closeModal}
						handleDownload={handleDownload}
					/>
				)}
			</div>
		</div>
	);
}

export default CheckInQrAndKeyModalContainer;
