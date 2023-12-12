/** @format */

import styles from "./styles.module.css";
import { Button, Paper, Divider, IconButton } from "@mui/material";
import {
	MicExternalOnRounded,
	AlbumRounded,
	CampaignRounded,
	CloseRounded,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setCreateAccountDefault } from "../../store/createAccountSlice";
import { useRouter } from "next/navigation";

interface SignUpModalProps {
	setSignupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUpModal({ setSignupModalOpen }: SignUpModalProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	return (
		<div className={styles.modal_div} onClick={() => setSignupModalOpen(false)}>
			<Paper onClick={(e) => e.stopPropagation()}>
				<div className={styles.signin_type_box}>
					<IconButton
						onClick={() => setSignupModalOpen(false)}
						color="secondary"
						sx={{
							position: "absolute",
							top: 0,
							right: 0,
						}}>
						<CloseRounded />
					</IconButton>
					Sign-Up As:
					<div className={styles.divider_div} style={{ marginTop: "10px" }}>
						<Divider variant="middle" flexItem />
					</div>
					<Button
						onClick={() => {
							dispatch(setCreateAccountDefault());
							router.push("/sign_up/performer");
						}}
						startIcon={<MicExternalOnRounded />}
						sx={{
							marginTop: "15px",
							width: "300px",
							height: "60px",
							fontSize: "20px",
						}}
						variant="outlined">
						Performer
					</Button>
					<Button
						onClick={() => {
							dispatch(setCreateAccountDefault());
							router.push("/sign_up/promoter");
						}}
						startIcon={<CampaignRounded />}
						sx={{
							marginTop: "15px",
							width: "300px",
							height: "60px",
							fontSize: "20px",
						}}
						variant="outlined">
						Promoter
					</Button>
					<Button
						onClick={() => {
							dispatch(setCreateAccountDefault());
							router.push("/sign_up/dj");
						}}
						startIcon={<AlbumRounded />}
						sx={{
							marginTop: "15px",
							width: "300px",
							fontSize: "20px",
							height: "60px",
						}}
						variant="outlined">
						Dj
					</Button>
				</div>
			</Paper>
		</div>
	);
}

export default SignUpModal;
