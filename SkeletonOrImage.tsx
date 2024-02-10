/** @format */
"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { getSignedUrl } from "./api_functions/getAnySignedUrl";
import { useSelector, useDispatch } from "react-redux";
import { setSrc } from "./store/imgStore";
import { RootState } from "./store/rootStore";
import defaulprofile from "./images/defaultprofile.png";
import Image from "next/image";

interface SkeletonOrImageProps {
	type:
		| "performer"
		| "promoter"
		| "dj"
		| "event"
		| "qr"
		| "event4X1"
		| "event3X1"
		| "promoter3X1"
		| "promoter4X1";
	id: string | number;
}

function SkeletonOrImage({ type, id }: SkeletonOrImageProps) {
	const [imageLoadAttempts, setImageLoadAttempts] = useState(0);
	const MAX_IMAGE_LOAD_ATTEMPTS = 3;
	const [isLoaded, setIsLoaded] = useState(false);
	const src = useSelector((state: RootState) => state.imageSrc[type]);
	const dispatch = useDispatch();

	const stringifiedId = typeof id === "number" ? id.toString() : id;

	useEffect(() => {
		if (!src[id]) {
			fetchImage();
		} else {
			setIsLoaded(true);
		}
	}, [id]);

	async function fetchImage() {
		setIsLoaded(false);

		try {
			const signedUrl = await getSignedUrl(type, stringifiedId);
			if (signedUrl) {
				dispatch(setSrc({ type, id: stringifiedId, url: signedUrl }));
			}
		} catch (error) {
			console.error("Error fetching signed URL:", error);
		}
	}

	function handleImageLoad() {
		setIsLoaded(true);
	}

	function handleImageError() {
		if (imageLoadAttempts < MAX_IMAGE_LOAD_ATTEMPTS) {
			setImageLoadAttempts(imageLoadAttempts + 1);
			fetchImage();
		} else {
			console.error("Max image load attempts reached. Image failed to load.");
		}
	}

	return (
		<>
			{!isLoaded && src[id] !== "no image" ? (
				<Skeleton
					variant="rectangular"
					style={{ display: "inline-block", width: "100%", height: "100%" }}
				/>
			) : null}
			{src[id] === "no image" ? (
				<Image
					alt="image"
					src={defaulprofile}
					style={{
						width: "100%",
						height: "100%",
						display: isLoaded ? "inline-block" : "none",
					}}
				/>
			) : (
				<img
					src={src[id]}
					style={{
						width: "100%",
						height: "100%",
						display: isLoaded ? "inline-block" : "none",
					}}
					onLoad={handleImageLoad}
					onError={handleImageError}
				/>
			)}
		</>
	);
}

export default SkeletonOrImage;
