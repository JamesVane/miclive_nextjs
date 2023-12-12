/** @format */

import { Campaign, Album, MicExternalOnRounded } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import styles from "./styles.module.css";
import SkeletonOrImage from "@/SkeletonOrImage";

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
				<SkeletonOrImage
					id={id}
					type={performer ? "performer" : dj ? "dj" : "promoter"}
				/>
			</Avatar>
		</Box>
	);
}

export default AvatarAspectBadge;
