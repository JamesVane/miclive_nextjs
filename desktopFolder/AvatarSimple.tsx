/** @format */
"use client";
import { useState } from "react";
import { Box, Avatar } from "@mui/material";
import { letterToHexcodeObject, TwoLetterKey } from "@/lettersToHexcodesObject";

interface AvatarSimple {
	ninety?: boolean;
	messageCount?: number;
	id: number;
	type: "promoter" | "dj" | "performer";
	doNotCache?: boolean;
	username: string;
}

function AvatarSimple({
	ninety,
	id,
	type,
	doNotCache,
	username,
}: AvatarSimple) {
	const [hasS3Image, setHasS3Image] = useState(true);

	const firstTwoLettersOfPerformerNameCapitolized = username[0]
		? ((username[0].toUpperCase() + username[1].toUpperCase()) as TwoLetterKey)
		: ("" as TwoLetterKey);

	const noPicColor =
		letterToHexcodeObject[firstTwoLettersOfPerformerNameCapitolized];

	function generateRandomFourDigitNumber() {
		return Math.floor(1000 + Math.random() * 9000);
	}
	const imageSource = doNotCache
		? `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/${type}_pictures/${type}_${id}.jpg?ver=${generateRandomFourDigitNumber()}`
		: `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/${type}_pictures/${type}_${id}.jpg`;
	function handleImageError() {
		setHasS3Image(false);
	}
	return (
		<Box
			sx={{
				zIndex: "20",
				height: ninety ? "85%" : "100%",
				width: ninety ? "85%" : "100%",
				position: "relative",
			}}>
			<Avatar
				sx={{
					// border: 1,
					// borderColor: "primary.main",
					height: "100%",
					width: "100%",
					backgroundColor: noPicColor,
				}}>
				{hasS3Image ? (
					<img
						onError={handleImageError}
						src={imageSource}
						style={{ height: "100%", width: "100%" }}
					/>
				) : (
					firstTwoLettersOfPerformerNameCapitolized
				)}
			</Avatar>
		</Box>
	);
}

export default AvatarSimple;
