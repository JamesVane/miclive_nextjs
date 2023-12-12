/** @format */
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Button, Card } from "@mui/material";
import styles from "./styles.module.css";
import { Auth } from "aws-amplify";
import { AddRounded, LoginRounded } from "@mui/icons-material";
import SignUpModalDesktop from "./SignUpModalDesktop";
import PromoterSection from "./PromoterSection";
import DjSection from "./DjSection";
import PerformerSection from "./PerformerSection";
import AudienceSection from "./AudienceSection";
import audienceVert from "../../images/mid_audience_vert.png";
import djVert from "../../images/mid_dj_vert.png";
import performerVert from "../../images/mid_performer_vert.png";
import promoterVert from "../../images/mid_promoter_vert.png";
import smokeVideo from "@/images/fast_simple_lights.mp4";

function StartPage() {
	const router = useRouter();

	const [signUpModalOpen, setSignUpModalOpen] = useState(false);
	const promoterSectionRef = useRef<HTMLDivElement | null>(null);
	const djSectionRef = useRef<HTMLDivElement | null>(null);
	const performerSectionRef = useRef<HTMLDivElement | null>(null);
	const audienceSectionRef = useRef<HTMLDivElement | null>(null);
	const homeSectionRef = useRef<HTMLDivElement | null>(null);
	const mainMainRef = useRef<HTMLDivElement | null>(null);

	const [currentSection, setCurrentSection] = useState<string | null>(null);

	const [scrollPercent, setScrollPercent] = useState<number>(0);

	useEffect(() => {
		const handleScroll = () => {
			const newValue =
				mainMainRef.current!.scrollTop / mainMainRef.current!.scrollHeight;
			setScrollPercent(newValue);
		};

		mainMainRef.current!.addEventListener("scroll", handleScroll);

		/* return () => {
			mainMainRef.current!.removeEventListener("scroll", handleScroll);
		}; */
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setCurrentSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.7 } // Adjust this value as needed. 0.7 means at least 70% of the section should be visible.
		);

		// Attach the observer to each section
		if (promoterSectionRef.current)
			observer.observe(promoterSectionRef.current);
		if (djSectionRef.current) observer.observe(djSectionRef.current);
		if (performerSectionRef.current)
			observer.observe(performerSectionRef.current);
		if (audienceSectionRef.current)
			observer.observe(audienceSectionRef.current);
		if (homeSectionRef.current) observer.observe(homeSectionRef.current);

		return () => {
			// Cleanup observers on component unmount
			if (promoterSectionRef.current)
				observer.unobserve(promoterSectionRef.current);
			if (djSectionRef.current) observer.unobserve(djSectionRef.current);
			if (performerSectionRef.current)
				observer.unobserve(performerSectionRef.current);
			if (audienceSectionRef.current)
				observer.unobserve(audienceSectionRef.current);
			if (homeSectionRef.current) observer.unobserve(homeSectionRef.current);
		};
	}, []);

	useEffect(() => {
		const checkUser = async () => {
			try {
				const currentUser = await Auth.currentAuthenticatedUser();
				if (currentUser.attributes) {
					if (currentUser.attributes["custom:RoleId"]) {
						router.push(`/${currentUser.attributes["custom:RoleType"]}`);
					} else {
						router.push(
							`/add_info/${currentUser.attributes["custom:RoleType"]}`
						);
					}
				}
			} catch {}
		};
		checkUser();
	}, []);

	function handleLogIn() {
		router.push("/sign_in");
	}

	function closeModal() {
		setSignUpModalOpen(false);
	}

	function handlePromoterScroll() {
		if (promoterSectionRef.current) {
			promoterSectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}
	function handleDjScroll() {
		if (djSectionRef.current) {
			djSectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}
	function handlePerformerScroll() {
		if (performerSectionRef.current) {
			performerSectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}
	function handleAudienceScroll() {
		if (audienceSectionRef.current) {
			audienceSectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}

	return (
		<div className={styles.main_main_div} ref={mainMainRef}>
			<video
				style={{
					width: "100vw",
					height: "100vh",
					position: "absolute",
					opacity: ".5",
				}}
				autoPlay={true}
				loop={true}
				muted
				src={smokeVideo}
			/>
			{signUpModalOpen ? <SignUpModalDesktop closeModal={closeModal} /> : null}
			<div className={styles.top_div}>
				<div className={styles.top_div_div}>
					<div className={styles.mic_live_div}>MIC.LIVE</div>

					<div className={styles.sign_up_in_div}>
						<Button
							onClick={() => {
								setSignUpModalOpen(true);
							}}
							startIcon={<AddRounded sx={{ height: "35px", width: "35px" }} />}
							variant="outlined"
							sx={{
								height: "65%",
								width: "180px",
								marginRight: "20px",
								fontSize: "25px",
							}}>
							sign-up
						</Button>
						<Button
							onClick={handleLogIn}
							startIcon={
								<LoginRounded sx={{ height: "35px", width: "35px" }} />
							}
							variant="outlined"
							sx={{
								height: "65%",
								width: "180px",
								marginRight: "20px",
								fontSize: "25px",
							}}>
							log-in
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.main_div} id="home" ref={homeSectionRef}>
				<div className={styles.top_div_container}>
					<div className={styles.tagline_top}>Get Rid Of The Headache</div>
					<div className={styles.tagline_bottom}>Focus On The Music</div>
					<div className={styles.first_info_div}>
						MIC.LIVE is a platform to make live music events streamlined and
						consistent, as well as increasing an event's visibility and
						networking opportunites.
					</div>
				</div>

				<div className={styles.bottom_main_div}>
					<Card
						className={styles.vert_card}
						onClick={handlePromoterScroll}
						sx={{ transition: "all 0.3s ease" }}>
						<Image
							src={promoterVert}
							alt="Promoter"
							className={styles.img_vert}
						/>
						<div className={styles.vert_card_title}>Promoter</div>
					</Card>
					<Card
						onClick={handleDjScroll}
						className={styles.vert_card}
						sx={{ transition: "all 0.3s ease" }}>
						<Image src={djVert} alt="DJ" className={styles.img_vert} />
						<div className={styles.vert_card_title}>DJ</div>
					</Card>
					<Card
						onClick={handlePerformerScroll}
						className={styles.vert_card}
						sx={{ transition: "all 0.3s ease" }}>
						<Image
							src={performerVert}
							alt="Performer"
							className={styles.img_vert}
						/>
						<div className={styles.vert_card_title}>Performer</div>
					</Card>
					<Card
						onClick={handleAudienceScroll}
						className={styles.vert_card}
						sx={{ transition: "all 0.3s ease" }}>
						<Image
							src={audienceVert}
							alt="Audience"
							className={styles.img_vert}
						/>
						<div className={styles.vert_card_title}>Audience Member</div>
					</Card>
				</div>
			</div>
			<PromoterSection
				inputRef={promoterSectionRef}
				scrollPercent={scrollPercent - 0.1}
			/>
			<DjSection inputRef={djSectionRef} scrollPercent={scrollPercent - 0.3} />
			<PerformerSection
				inputRef={performerSectionRef}
				scrollPercent={scrollPercent - 0.5}
			/>
			<AudienceSection
				inputRef={audienceSectionRef}
				scrollPercent={scrollPercent - 0.7}
			/>
		</div>
	);
}

export default StartPage;
