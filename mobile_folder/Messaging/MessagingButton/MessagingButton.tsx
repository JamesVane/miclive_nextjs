/** @format */

import styles from "./styles.module.css";
import { InsertCommentRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface MessagingButtonProps {
	notAbsolute?: boolean;
}

function MessagingButton({ notAbsolute }: MessagingButtonProps) {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/m/direct`)}
			style={{
				opacity: "0.9",
				overflow: "hidden",
				borderRadius: "10px",
			}}
			className={notAbsolute ? styles.paper_main_not_abs : styles.paper_main}>
			<div className={styles.helper_div}>
				<InsertCommentRounded sx={{ width: "35px", height: "35px" }} />
			</div>
		</div>
	);
}

export default MessagingButton;
