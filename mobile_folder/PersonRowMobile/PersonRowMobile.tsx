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
				<AvatarSimpleMobile username={name} ninety id={roleId} type={type} />
			</div>
			<div className={styles.right_div}>
				<div className={styles.right_top}>{name}</div>
				<div className={styles.right_bottom}>
					{type === "promoter" ? (
						<>
							<CampaignRounded
								sx={{
									height: "18px",
									width: "18px",
								}}
							/>
							Promoter
						</>
					) : (
						<>
							<AlbumRounded
								sx={{
									height: "18px",
									width: "18px",
								}}
							/>
							DJ
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default PersonRowMobile;
