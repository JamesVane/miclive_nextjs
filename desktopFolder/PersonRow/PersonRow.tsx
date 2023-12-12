/** @format */

import { useState } from "react";
import { Paper, ButtonBase } from "@mui/material";
import AvatarAspectBadge from "@desk/AvatarAspectBadge";
import styles from "./styles.module.css";
// import { setHoldNewConversationSlice } from "../../../store/holdNewConversationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { setViewUserInfoModalSlice } from "@/store/viewUserInfoModalSlice";

interface PersonRow {
	name: string;
	tagline: string;
	id: number;
	promoter?: boolean;
	dj?: boolean;
	noline?: boolean;
	cameFrom: "performer" | "dj" | "promoter";
	userSub: string;
	userInfo?: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

function PersonRow({
	name,
	tagline,
	id,
	promoter,
	dj,
	cameFrom,
	userSub,
	userInfo,
}: PersonRow) {
	const dispatch = useDispatch();

	const [onHover, setOnHover] = useState(false);

	const conversationList = useSelector(
		(state: RootState) => state.conversationList
	);

	function handleViewInfo() {
		dispatch(
			setViewUserInfoModalSlice({
				roleId: id,
				userType: promoter ? "promoter" : "dj",
				name: name,
				tagline: tagline,
				info: userInfo!,
				userSub: userSub,
			})
		);
	}
	return (
		<div className={styles.main_wrap}>
			<div
				className={styles.paper_div}
				onMouseEnter={() => setOnHover(true)}
				onMouseLeave={() => setOnHover(false)}>
				<ButtonBase
					onClick={handleViewInfo}
					className={styles.button_base_style}
					style={{
						backgroundColor: onHover ? "rgba(0, 0, 0, .2)" : "transparent",
					}}>
					<AvatarAspectBadge promoter={promoter} dj={dj} id={id} />
					<div className={styles.person_left_side}>
						<div className={styles.person_name_div}>{name}</div>
						<div className={styles.person_type_div}>
							{promoter ? "Promoter" : "DJ"}
						</div>
					</div>
				</ButtonBase>
			</div>
		</div>
	);
}

export default PersonRow;
