/** @format */
"use client";

import { Box, Avatar } from "@mui/material";
import SkeletonOrImage from "@/SkeletonOrImage";

interface AvatarSimple {
	ninety?: boolean;
	messageCount?: number;
	id: number;
	type: "promoter" | "dj" | "performer";
}

function AvatarSimple({ ninety, messageCount, id, type }: AvatarSimple) {
	return (
		<Box
			sx={{
				zIndex: "20",
				height: ninety ? "85%" : "100%",
				width: ninety ? "85%" : "100%",
				position: "relative",
			}}>
			{messageCount && (
				<Avatar
					sx={{
						top: 0,
						right: 0,
						position: "absolute",
						zIndex: "25",
						height: "20px",
						width: "20px",
						backgroundColor: "error.dark",
						fontSize: "15px",
						color: "secondary.main",
					}}>
					{messageCount}
				</Avatar>
			)}
			<Avatar
				sx={{
					border: 1,
					borderColor: "primary.main",
					height: "100%",
					width: "100%",
				}}>
				<SkeletonOrImage id={id} type={type} />
			</Avatar>
		</Box>
	);
}

export default AvatarSimple;
