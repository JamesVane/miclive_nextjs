/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import {
	Avatar,
	Button,
	Divider,
	Link,
	Snackbar,
	Alert,
	Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import {
	Instagram,
	EditRounded,
	LocalOfferRounded,
	AccountBoxRounded,
	CameraAltRounded,
} from "@mui/icons-material";
import AppBarMobile from "@mobi/AppBarMobile";
import ProfileBannerMobile from "./ProfileBannerMobile";

interface ProfileInfoProps {
	performer?: boolean;
	dj?: boolean;
	promoter?: boolean;
	setEditingOpen: () => void;
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

	const InstagramLink =
		usersState && usersState.info && usersState.info.IG
			? usersState.info.IG
			: null;

	function handleEditButton() {
		setEditingOpen();
	}

	const taglineCheckIfEmpty =
		usersState?.tagline === "EMPTY" ? "No Tagline" : usersState?.tagline;

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
			<AppBarMobile profilePage>
				<div className={styles.title_box}>
					PROFILE
					<div className={styles.title_underline} />
				</div>
			</AppBarMobile>
			{usersState ? (
				<div className={styles.main_div}>
					<div className={styles.edit_div}>
						<Button
							size="small"
							onClick={handleEditButton}
							startIcon={<EditRounded />}
							variant="outlined">
							edit profile
						</Button>
					</div>

					<div className={styles.pfofile_picture_div}>
						<div className={styles.profile_pic_box}>
							<AvatarSimpleMobile
								ninety
								username={usersState.username}
								doNotCache
								type={
									performer
										? "performer"
										: promoter
										? "promoter"
										: dj
										? "dj"
										: "performer"
								}
								id={Number(usersState.primary_key)}
							/>
						</div>
						<div className={styles.profile_avatar_text}>
							<CameraAltRounded
								sx={{
									marginRight: "5px",
									marginBottom: "6px",
									height: "25px",
									width: "25px",
								}}
							/>
							Profile Avatar
						</div>
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.profile_row_top}>Username</div>
					<div className={styles.profile_row}>
						<div className={styles.profile_icon}>
							<AccountBoxRounded
								color="primary"
								sx={{
									height: "30px",
									width: "30px",
								}}
							/>
						</div>
						<div className={styles.profile_text}>
							<div className={styles.elipses_text}>{usersState.username}</div>
						</div>
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.profile_row_top}>Tagline</div>
					<div className={styles.profile_row}>
						<div className={styles.profile_icon}>
							<LocalOfferRounded
								color="primary"
								sx={{
									height: "30px",
									width: "30px",
								}}
							/>
						</div>
						<div className={styles.profile_text}>
							<div className={styles.elipses_text}>{taglineCheckIfEmpty}</div>
						</div>
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.profile_row_top}>Instagram</div>
					<div className={styles.profile_row}>
						<div className={styles.profile_icon}>
							<Instagram
								color="primary"
								sx={{
									height: "30px",
									width: "30px",
								}}
							/>
						</div>
						<div className={styles.profile_text}>
							{InstagramLink ? (
								<Link
									href={InstagramLink}
									target="_blank"
									rel="noopener noreferrer">
									<Box className={styles.elipses_text}>{InstagramLink}</Box>
								</Link>
							) : (
								"No instagram link"
							)}
						</div>
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>

					{/* {promoter ? <ProfileBannerComponent /> : null} */}
				</div>
			) : null}
			{/* {promoter ? <ProfileBannerMobile /> : null} */}
		</>
	);
}

export default ProfilePage;
