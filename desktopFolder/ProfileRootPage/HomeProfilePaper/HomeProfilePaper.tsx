/** @format */

import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { Button, Tabs, Tab, Link, Divider, Box } from "@mui/material";
import {
	Instagram,
	ArrowBackIosNewRounded,
	EditRounded,
	LocalOfferRounded,
	AccountBoxRounded,
	CameraAltRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import HomeBarV2 from "@desk/HomeBarV2";
import { useRouter } from "next/navigation";
import AvatarSimple from "@/desktopFolder/AvatarSimple";
import SplashPage from "@/SplashPage";

interface HomeProfilePaperProps {
	performer?: boolean;
	dj?: boolean;
	promoter?: boolean;
	handleEdit: () => void;
}

function HomeProfilePaper({
	performer,
	dj,
	promoter,
	handleEdit,
}: HomeProfilePaperProps) {
	const router = useRouter();

	const fromUrl = localStorage.getItem("fromUrl");

	const usersStateFromStore = useSelector(
		(state: RootState) => state.usersState
	);

	const InstagramLink =
		usersStateFromStore &&
		usersStateFromStore.info &&
		usersStateFromStore.info.IG
			? usersStateFromStore.info.IG
			: null;

	async function handleGoBack() {
		if (fromUrl) {
			await new Promise(() => router.push(fromUrl));
			localStorage.removeItem("fromUrl");
		} else {
			router.push(
				`/${performer ? "performer" : promoter ? "promoter" : dj ? "dj" : ""}`
			);
		}
	}

	return (
		<>
			{usersStateFromStore ? (
				<>
					<HomeBarV2 profileOpen hasAccountAlertsSection>
						<Button
							onClick={handleGoBack}
							startIcon={<ArrowBackIosNewRounded />}
							variant="outlined"
							sx={{ position: "absolute", left: "230px" }}>
							back
						</Button>
						<div
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Tabs
								value={"profile"}
								textColor="primary"
								indicatorColor="primary"
								aria-label="secondary tabs example">
								<Tab
									value="profile"
									label={`${
										promoter
											? "Promoter"
											: performer
											? "Performer"
											: dj
											? "DJ"
											: "ERROR"
									} Profile`}
									sx={{ fontSize: "25px" }}
								/>
							</Tabs>
						</div>
					</HomeBarV2>
					<div className={styles.main_div}>
						<div className={styles.paper_wrapper}>
							<Button
								onClick={handleEdit}
								startIcon={<EditRounded />}
								variant="outlined"
								sx={{
									position: "absolute",
									right: "5px",
									top: "5px",
								}}>
								edit profile
							</Button>
							<div className={styles.pfofile_picture_div}>
								<div className={styles.profile_pic_box}>
									<AvatarSimple
										ninety
										username={usersStateFromStore.username}
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
										id={Number(usersStateFromStore.primary_key)}
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
									<div className={styles.elipses_text}>
										{usersStateFromStore.username}
									</div>
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
									<div className={styles.elipses_text}>
										{usersStateFromStore.tagline}
									</div>
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
						</div>
						{/* {promoter ? <ProfileBannerComponent /> : null} */}
					</div>
				</>
			) : (
				<SplashPage />
			)}
		</>
	);
}

export default HomeProfilePaper;
