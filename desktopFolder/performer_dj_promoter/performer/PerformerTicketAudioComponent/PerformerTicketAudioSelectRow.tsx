/** @format */
import { useState } from "react";
import S3PlaybackWrapper from "@/audioComponents/S3PlaybackWrapper";
import { Button, Divider } from "@mui/material";
import { CheckRounded } from "@mui/icons-material";

interface PerformerTicketAudioSelectRow {
	audioKey: {
		audio_id: number;
		name: string;
		audio_length: string;
		performer_id: number;
	};
	selectExistingAudio: (audioKey: {
		audio_id: number;
		name: string;
		audio_length: string;
		performer_id: number;
	}) => void;
	isTooLong: boolean;
}

function PerformerTicketAudioSelectRow({
	audioKey,
	selectExistingAudio,
	isTooLong,
}: PerformerTicketAudioSelectRow) {
	const [isHovering, setIsHovering] = useState(false);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					width: "100%",
					height: "100px",
					minHeight: "100px",
					transition: "all 0.3s ease-in-out",
				}}
				onMouseEnter={() => {
					setIsHovering(true);
				}}
				onMouseLeave={() => {
					setIsHovering(false);
				}}>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						transition: "all 0.3s ease-in-out",
						width: isHovering ? "calc(100% - 100px)" : "100%",
						maxWidth: isHovering ? "calc(100% - 100px)" : "100%",
					}}>
					<div
						style={{
							width: "100%",
							maxWidth: "100%",
							height: "50%",
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
							transition: "all 0.3s ease-in-out",
							paddingLeft: "15px",
							fontSize: "18px",
						}}>
						{audioKey.name}
					</div>
					<S3PlaybackWrapper
						audioId={audioKey.audio_id.toString()}
						performerId={audioKey.performer_id.toString()}
					/>
				</div>
				{isHovering ? (
					<div
						style={{
							display: "flex",
							width: "100px",
							minWidth: "100px",
							height: "100px",
							alignItems: "center",
							justifyContent: "center",
							transition: "all 0s ease-in-out",
						}}>
						<Button
							onClick={() => {
								selectExistingAudio(audioKey);
							}}
							color="success"
							variant="outlined"
							disabled={isTooLong}
							sx={{
								width: "80%",
								height: "80%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "16px",
							}}>
							{isTooLong ? "too long" : "select"}
							<CheckRounded
								sx={{
									height: "35px",
									width: "35px",
									marginTop: "-5px",
								}}
							/>
						</Button>
					</div>
				) : null}
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Divider variant="middle" flexItem />
			</div>
		</div>
	);
}

export default PerformerTicketAudioSelectRow;
