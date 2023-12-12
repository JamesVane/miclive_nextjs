/** @format */

import { Button, Divider } from "@mui/material";
import { LogoutRounded, HomeRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

interface WrongAccountTypeProps {
	accountType: "promoter" | "performer";
}

function WrongAccountType({ accountType }: WrongAccountTypeProps) {
	const router = useRouter();

	function handleGoHome() {
		router.push(`/${accountType}`);
	}

	function handleLogOut() {
		localStorage.clear();
		sessionStorage.clear();
		window.location.reload();
	}

	function capitalizeFirstLetter(input: string): string {
		if (!input || input.length === 0) {
			return input;
		}
		return input.charAt(0).toUpperCase() + input.slice(1);
	}

	return (
		<div className={styles.wrong_page}>
			You are currently logged{" "}
			<div className={styles.row_helper}>
				in as a
				<div className={styles.primary_helper}>{`${capitalizeFirstLetter(
					accountType
				)}.`}</div>
			</div>
			<div className={styles.divider_div} style={{ width: "420px" }}>
				<Divider flexItem />
			</div>
			<div className={styles.row_helper}>
				<Button
					onClick={handleLogOut}
					sx={{
						fontSize: "25px",
						marginTop: "15px",
						marginRight: "10px",
						marginBottom: "15px",
					}}
					startIcon={<LogoutRounded />}
					variant="outlined">
					log-out
				</Button>
				<div className={styles.column_helper}>
					<div className={styles.smaller_text}>and use a DJ account</div>
					<div className={styles.smaller_text}>to accept the invite</div>
				</div>
			</div>
			<div className={styles.divider_div} style={{ width: "420px" }}>
				<Divider flexItem />
			</div>
			<div>Or</div>
			<Button
				onClick={handleGoHome}
				sx={{ fontSize: "25px" }}
				startIcon={<HomeRounded />}
				variant="outlined">
				go to account home
			</Button>
		</div>
	);
}

export default WrongAccountType;
