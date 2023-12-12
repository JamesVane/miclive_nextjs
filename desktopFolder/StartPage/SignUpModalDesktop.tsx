/** @format */

import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { setCreateAccountDefault } from "../../store/createAccountSlice";
import { useRouter } from "next/navigation";
import { Paper, Button, Divider, IconButton } from "@mui/material";
import {
	CampaignRounded,
	MicExternalOnRounded,
	AlbumRounded,
	CloseRounded,
} from "@mui/icons-material";

interface SignUpModalDesktopProps {
	closeModal: () => void;
}

function SignUpModalDesktop({ closeModal }: SignUpModalDesktopProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	function handleCreateAccount(type: "performer" | "promoter" | "dj") {
		dispatch(setCreateAccountDefault());
		router.push(`/sign_up/${type}`);
	}

	return (
		<div className={styles.sign_up_main_div} onClick={closeModal}>
			<Paper
				className={styles.sign_up_paper}
				onClick={(e) => e.stopPropagation()}>
				<IconButton
					onClick={closeModal}
					color="secondary"
					sx={{ position: "absolute", top: 0, right: 0 }}>
					<CloseRounded />
				</IconButton>
				Sign-Up as:
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
				<Button
					onClick={() => {
						handleCreateAccount("promoter");
					}}
					startIcon={<CampaignRounded sx={{ height: "30px", width: "30px" }} />}
					variant="outlined"
					sx={{
						height: "65px",
						width: "92%",
						fontSize: "25px",
						marginTop: "25px",
					}}>
					promoter
				</Button>
				<Button
					onClick={() => {
						handleCreateAccount("performer");
					}}
					startIcon={
						<MicExternalOnRounded sx={{ height: "30px", width: "30px" }} />
					}
					variant="outlined"
					sx={{
						height: "65px",
						width: "92%",
						fontSize: "25px",
						marginTop: "25px",
					}}>
					performer
				</Button>
				<Button
					onClick={() => {
						handleCreateAccount("dj");
					}}
					startIcon={<AlbumRounded sx={{ height: "30px", width: "30px" }} />}
					variant="outlined"
					sx={{
						height: "65px",
						width: "92%",
						fontSize: "25px",
						marginTop: "25px",
					}}>
					dj
				</Button>
			</Paper>
		</div>
	);
}

export default SignUpModalDesktop;
