/** @format */
"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Button, Card } from "@mui/material";
import {
	DirectionsWalkRounded,
	MeetingRoomRounded,
	MicExternalOnRounded,
	AlbumRounded,
	CampaignRounded,
	LoginRounded,
	CircleRounded,
	AddRounded,
	GroupsRounded,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setSignInDefault } from "@/store/signInStateSlice";
import { Auth } from "aws-amplify";
import promoterVert from "@/images/mid_promoter_vert.png";
import djVert from "@/images/mid_dj_vert.png";
import performerVert from "@/images/mid_performer_vert.png";
import audienceVert from "@/images/mid_audience_vert.png";
import SignUpModal from "./SignUpModal";
import WalkinModal from "./WalkinModal";
import DividerH from "@/universalComponents/DividerH";
import horizLogo from "@/images/miclive_svg_horiz.svg";
import Image from "next/image";

function StartPage() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [signupModalOpen, setSignupModalOpen] = useState(false);
	const [walkinOpen, setWalkinOpen] = useState(false);

	useEffect(() => {
		const checkUser = async () => {
			try {
				const currentUser = await Auth.currentAuthenticatedUser();
				if (currentUser.attributes) {
					if (currentUser.attributes["custom:RoleId"]) {
						router.push(`/m/${currentUser.attributes["custom:RoleType"]}`);
					} else {
						router.push(
							`/m/add_info/${currentUser.attributes["custom:RoleType"]}`
						);
					}
				}
			} catch {}
		};

		checkUser();
	}, []);
	const iconStyles = {
		height: "20px",
		width: "20px",
		marginRight: "15px",
		marginTop: "2.5px",
		alignSelf: "start",
		color: "secondary.main",
	};

	return (
		<>
			{signupModalOpen ? (
				<SignUpModal setSignupModalOpen={setSignupModalOpen} />
			) : null}
			{walkinOpen ? <WalkinModal setWalkinOpen={setWalkinOpen} /> : null}
			<div className={styles.miclive_header}>
				<Image alt="mic.live logo" src={horizLogo} style={{ width: "50%" }} />
			</div>
			<div className={styles.header_mask_z}></div>
			<div className={styles.main_div}>
				<div style={{ height: "65px", width: "100%" }} />

				<div className={styles.app_tagline}>The future of Live Events</div>
				<div className={styles.app_description}>
					A platform that makes live events streamlined and consistent, viral
					and profitable.
				</div>
				<DividerH />
				<div className={styles.walkin_box}>
					<Button
						onClick={() => {
							dispatch(setSignInDefault());
							router.push("/m/sign_in");
						}}
						startIcon={<LoginRounded />}
						sx={{
							width: "325px",
							height: "50px",
							fontSize: "20px",
							marginTop: "15px",
						}}
						variant="outlined">
						Log-In
					</Button>
					<Button
						onClick={() => {
							setSignupModalOpen(true);
						}}
						startIcon={<AddRounded />}
						sx={{
							width: "325px",
							height: "50px",
							fontSize: "20px",
							marginTop: "15px",
						}}
						variant="outlined">
						Sign-Up
					</Button>
					<Button
						onClick={() => setWalkinOpen(true)}
						sx={{
							width: "325px",
							height: "50px",
							fontSize: "20px",
							marginTop: "15px",
						}}
						variant="outlined"
						startIcon={
							<>
								<DirectionsWalkRounded /> <MeetingRoomRounded />
							</>
						}>
						Walk-in
					</Button>
				</div>
			</div>
			<div className={styles.card_div}>
				<Card
					sx={{
						height: "97%",
						width: "90%",
						zIndex: "150",
						position: "relative",
					}}>
					<Image
						alt="promoter"
						className={styles.img_vert}
						src={promoterVert}
					/>

					<div className={styles.bottom_card_info}>
						<div className={styles.person_card_title}>
							<CampaignRounded
								sx={{ height: "42px", width: "42px", marginRight: "5px" }}
							/>
							Promoter
						</div>
						<DividerH />
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Payments and checkin made as easy as can be
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Send announcements to all artists who are attending an event
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							See detailed statastics and metrics from previous events
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Advertise your event to the correct audience
						</div>
					</div>
				</Card>
			</div>
			<div className={styles.card_div}>
				<Card
					sx={{
						height: "97%",
						width: "90%",
						zIndex: "150",
						position: "relative",
					}}>
					<Image
						alt="dj"
						className={styles.img_vert}
						src={djVert}
						style={{ objectPosition: "bottom center" }}
					/>
					<div className={styles.bottom_card_info}>
						<div className={styles.person_card_title}>
							<AlbumRounded
								sx={{ height: "42px", width: "42px", marginRight: "5px" }}
							/>
							DJ
						</div>
						<DividerH />
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Performers are notified by text when they should be ready to
							perform
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Download performer's pre submitted audio files from one place
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							easily communicate with performers during an event
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Know exactly how much time you have to give each performer
						</div>
					</div>
				</Card>
			</div>
			<div className={styles.card_div}>
				<Card
					sx={{
						height: "97%",
						width: "90%",
						zIndex: "150",
						position: "relative",
					}}>
					<Image
						alt="performer"
						className={styles.img_vert}
						src={performerVert}
					/>
					<div className={styles.bottom_card_info}>
						<div className={styles.person_card_title}>
							<MicExternalOnRounded
								sx={{ height: "42px", width: "42px", marginRight: "5px" }}
							/>
							Performer
						</div>
						<DividerH />
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Never miss a performance time
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							submit audio files ahead of time and save them to your account
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Easily communicate with the Promoter and DJ at an event
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Find an artist's contact info the next day if you missed them at
							an event
						</div>
					</div>
				</Card>
			</div>
			<div className={styles.card_div}>
				<Card
					sx={{
						height: "97%",
						width: "90%",
						zIndex: "150",
						position: "relative",
					}}>
					<Image
						alt="audience"
						className={styles.img_vert}
						src={audienceVert}
					/>
					<div className={styles.bottom_card_info}>
						<div className={styles.person_card_title}>
							<GroupsRounded
								sx={{ height: "42px", width: "42px", marginRight: "5px" }}
							/>
							Audience
						</div>
						<DividerH />
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Find and support local talent
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							check who will be performing at an event before you go
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Read and write reviews for performers and events
						</div>
						<div className={styles.bullet_point_div}>
							<CircleRounded sx={iconStyles} />
							Follow your favorite artists to see when they perform next
						</div>
					</div>
				</Card>
			</div>
		</>
	);
}

export default StartPage;
