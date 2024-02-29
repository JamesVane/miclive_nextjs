/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import {
	Avatar,
	Button,
	Divider,
	Link,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import {
	EditRounded,
	LocationCityRounded,
	EmailRounded,
	Instagram,
	ContentCopyRounded,
	InsertLinkRounded,
	LocalPhoneRounded,
} from "@mui/icons-material";
import { truncateLink } from "@/generic_functions/truncateLink";
import AppBarMobile from "@mobi/AppBarMobile";
import DividerH from "@/universalComponents/DividerH";
import ProfileBannerMobile from "./ProfileBannerMobile";

interface ProfileInfoProps {
	performer?: boolean;
	dj?: boolean;
	promoter?: boolean;
	setEditingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InfoValuesProps {
	isLink: boolean;
	text: string;
}

function ProfilePage({
	performer,
	dj,
	promoter,
	setEditingOpen,
}: ProfileInfoProps) {
	const usersState = useSelector((state: RootState) => state.usersState);

	const [linkCopySnack, setLinkCopySnack] = useState(false);

	function copyPublicProfileLink() {
		if (usersState) {
			let publicProfileLink = `micbeta.live/promoter_info/${usersState.username}`;
			navigator.clipboard
				.writeText(publicProfileLink)
				.then(() => {
					setLinkCopySnack(true);
				})
				.catch((err) => {});
		} else {
		}
	}

	const avatarSx = {
		width: "30px",
		height: "30px",
		color: "#f4daa1ff",
		backgroundColor: "transparent",
		border: "1px solid #f4daa1ff",
		marginRight: "10px",
	};

	function InfoValues({ isLink, text }: InfoValuesProps) {
		const truncatedLink = isLink ? truncateLink(text as string, 20) : text;
		return (
			<>
				{isLink ? (
					<Link href={text as string} target="_blank" rel="noopener noreferrer">
						<Typography
							sx={{
								marginLeft: "5px",
								fontWeight: "normal",
								maxWidth: "250px",
								textOverflow: "ellipsis",
								overflow: "hidden",
								whiteSpace: "nowrap",
							}}>
							{truncatedLink}
						</Typography>
					</Link>
				) : (
					<Typography
						sx={{
							marginLeft: "5px",
							fontWeight: "normal",
							maxWidth: "250px",
							textOverflow: "ellipsis",
							overflow: "hidden",
							whiteSpace: "nowrap",
						}}>
						{truncatedLink}
					</Typography>
				)}
			</>
		);
	}
	console.log("usersState?.primary_key", usersState?.primary_key);

	return (
		<>
			<Snackbar
				open={linkCopySnack}
				autoHideDuration={6000}
				onClose={() => setLinkCopySnack(false)}>
				<Alert
					onClose={() => setLinkCopySnack(false)}
					severity="success"
					sx={{ width: "100%" }}>
					Date Dj Link Copied!
				</Alert>
			</Snackbar>
			<div className={styles.main_div}>
				<AppBarMobile profilePage>
					<div>My Profile</div>
				</AppBarMobile>
				<div className={styles.top_half}>
					<div className={styles.picture_wrap}>
						<AvatarSimpleMobile
							ninety
							type={
								performer
									? "performer"
									: dj
									? "dj"
									: promoter
									? "promoter"
									: "performer"
							}
							id={Number(usersState?.primary_key)}
						/>
					</div>
					<div className={styles.name_tagline_wrap}>
						<div className={styles.name_wrap}>{usersState!.username}</div>
						<div className={styles.tagline_wrap}>
							<div>{usersState!.tagline}</div>
						</div>
					</div>
				</div>
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<Avatar sx={{ ...avatarSx }}>
							<LocationCityRounded />
						</Avatar>
						City
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<InfoValues
						isLink={false}
						text={usersState!.info?.City ? usersState!.info!.City! : "No City"}
					/>
				</div>
				<DividerH />
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<Avatar sx={{ ...avatarSx }}>
							<EmailRounded />
						</Avatar>
						Email
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<InfoValues
						isLink={false}
						text={
							usersState!.info?.Email ? usersState!.info!.Email! : "No Email"
						}
					/>
				</div>
				<DividerH />
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<Avatar sx={{ ...avatarSx }}>
							<Instagram />
						</Avatar>
						Instagram
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<InfoValues
						isLink={true}
						text={usersState!.info?.IG ? usersState!.info!.IG! : "No Instagram"}
					/>
				</div>
				<DividerH />
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<Avatar sx={{ ...avatarSx }}>
							<InsertLinkRounded />
						</Avatar>
						Link
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<InfoValues
						isLink={true}
						text={usersState!.info?.Link ? usersState!.info!.Link! : "No Link"}
					/>
				</div>
				<DividerH />
				<div className={styles.info_row}>
					<div className={styles.info_row_left}>
						<Avatar sx={{ ...avatarSx }}>
							<LocalPhoneRounded />
						</Avatar>
						Phone
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<InfoValues
						isLink={false}
						text={
							usersState!.info?.Phone ? usersState!.info!.Phone! : "No Phone"
						}
					/>
				</div>
				<DividerH />
				<div className={styles.edit_row}>
					<Button
						size="small"
						variant="outlined"
						startIcon={<EditRounded />}
						onClick={() => setEditingOpen(true)}>
						Edit Profile Info
					</Button>
					{promoter ? (
						<Button
							size="small"
							sx={{}}
							startIcon={<ContentCopyRounded />}
							onClick={copyPublicProfileLink}>
							Copy page link
						</Button>
					) : null}
				</div>
			</div>
			{promoter ? <ProfileBannerMobile /> : null}
		</>
	);
}

export default ProfilePage;
