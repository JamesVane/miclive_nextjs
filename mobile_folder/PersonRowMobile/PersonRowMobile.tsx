/** @format */

import styles from "./styles.module.css";
import { Avatar } from "@mui/material";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import { CampaignRounded, AlbumRounded } from "@mui/icons-material";
interface PersonRowMobileProps {
	roleId: number;
	type: "promoter" | "dj";
	name: string;
	handleClick: () => void;
}

function PersonRowMobile({
	roleId,
	type,
	name,
	handleClick,
}: PersonRowMobileProps) {
	return (
		<div className={styles.person_div} onClick={handleClick}>
			<div className={styles.avatar_div}>
				<AvatarSimpleMobile ninety id={roleId} type={type} />
				<Avatar
					sx={{
						border: "1px solid #888661ff",
						zIndex: "100",
						height: "25px",
						width: "25px",
						position: "absolute",
						bottom: "2.5px",
						right: "2.5px",
						color: "primary.main",
						backgroundColor: "#272727ff",
					}}>
					{type === "promoter" ? (
						<CampaignRounded sx={{ height: "18px", width: "18px" }} />
					) : type === "dj" ? (
						<AlbumRounded
							sx={{
								height: "90%",
								width: "90%",
							}}
						/>
					) : null}
				</Avatar>
			</div>
			<div className={styles.right_div}>
				<div className={styles.right_top}>{name}</div>
				<div className={styles.right_bottom}>
					{type === "promoter" ? "Promoter" : "DJ"}
				</div>
			</div>
		</div>
	);
}

export default PersonRowMobile;
