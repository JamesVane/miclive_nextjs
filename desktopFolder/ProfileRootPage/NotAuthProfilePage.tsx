/** @format */

import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { LoginRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function NotAuthProfilePage() {
	const router = useRouter();

	function handleNavigateToSignIn() {
		router.push("/sign_in");
	}

	return (
		<div className={styles.not_auth_main}>
			Not Signed-In
			<Button
				onClick={handleNavigateToSignIn}
				startIcon={<LoginRounded />}
				variant="outlined"
				size="large"
				sx={{ marginTop: "5px" }}>
				Sign-In
			</Button>
		</div>
	);
}

export default NotAuthProfilePage;
