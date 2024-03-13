/** @format */
"use client";

import { useState } from "react";
import { Paper, ButtonBase } from "@mui/material";
import AvatarAspectBadge from "@desk/AvatarAspectBadge";
import styles from "./styles.module.css";
// import { setHoldNewConversationSlice } from "../../../store/holdNewConversationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { setViewUserInfoModalSlice } from "@/store/viewUserInfoModalSlice";
import AvatarSimple from "../AvatarSimple";
import { CampaignRounded, AlbumRounded } from "@mui/icons-material";

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
	inputHeight: string;
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
	inputHeight,
}: PersonRow) {
	const dispatch = useDispatch();

	const typeToString = promoter ? "promoter" : "dj";

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
		<div
			className={styles.main_wrap}
			style={{
				height: inputHeight,
			}}>
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
					<div
						className={styles.pic_div}
						style={{
							height: inputHeight,
							width: inputHeight,
						}}>
						<AvatarSimple type={typeToString} id={id} username={name} ninety />
					</div>

					<div
						className={styles.person_left_side}
						style={{
							width: `calc(100% - ${inputHeight})`,
						}}>
						<div className={styles.person_name_div}>{name}</div>
						<div className={styles.person_type_div}>
							{dj ? (
								<AlbumRounded
									sx={{ marginRight: "3px", height: "20px", width: "20px" }}
								/>
							) : null}{" "}
							{promoter ? (
								<CampaignRounded
									sx={{ marginRight: "3px", height: "20px", width: "20px" }}
								/>
							) : null}{" "}
							{promoter ? "Promoter" : "DJ"}
						</div>
					</div>
				</ButtonBase>
			</div>
		</div>
	);
}

export default PersonRow;
