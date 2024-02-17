/** @format */
"use client";

import { Campaign, Album, MicExternalOnRounded } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import styles from "./styles.module.css";

interface AvatarAspectBadgeProps {
	id: number;
	promoter?: boolean;
	dj?: boolean;
	performer?: boolean;
}

function AvatarAspectBadge({
	id,
	promoter,
	dj,
	performer,
}: AvatarAspectBadgeProps) {
	const iconStyles = {
		width: "75%",
		height: "75%",
	};

	const typeToString = performer ? "performer" : dj ? "dj" : "promoter";

	return (
		<Box className={styles.box_style}>
			{promoter || dj || performer ? (
				<Avatar
					sx={{
						bottom: 0,
						right: 0,
						position: "absolute",
						zIndex: "25",
						height: "35%",
						width: "35%",
						backgroundColor: "#272727ff",
						border: "1px solid #898661",
						fontSize: "15px",
						color: "#898661",
						marginBottom: "5px",
					}}>
					{promoter && <Campaign sx={iconStyles} />}
					{dj && <Album sx={iconStyles} />}
					{performer && <MicExternalOnRounded sx={iconStyles} />}
				</Avatar>
			) : (
				<></>
			)}

			<Avatar
				sx={{
					flex: "1",
					height: "100%",
					aspectRatio: "1/1",
					border: 1,
					borderColor: "primary.main",
				}}>
				<img
					src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/${typeToString}_pictures/${typeToString}_${id}.jpg`}
					style={{ height: "100%", width: "100%" }}
				/>
			</Avatar>
		</Box>
	);
}

export default AvatarAspectBadge;
