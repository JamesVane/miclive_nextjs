/** @format */
"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { Avatar, Divider, Link, Popover } from "@mui/material";
import { truncateLink } from "../../generic_functions/truncateLink";
import {
	LocationCityRounded,
	EmailRounded,
	LocalPhoneRounded,
	Instagram,
	InsertLinkRounded,
	ContentCopyRounded,
} from "@mui/icons-material";

interface InfoValuesProps {
	isLink: boolean;
	value: string | undefined;
	type: "City" | "Email" | "Phone" | "IG" | "Link";
}

function InfoValuesDesktop({ isLink, value, type }: InfoValuesProps) {
	const iconStyles = { height: "80%", width: "80%", marginRight: ".5px" };

	const avatarStyles = {
		width: "45px",
		height: "45px",
		color: "#f8dca2ff",
		backgroundColor: "#1e262aff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "1px solid #f8dca2ff",
	};

	// Function to copy to clipboard
	const handleCopyToClipboard = (textToCopy: string) => {
		navigator.clipboard.writeText(textToCopy).then(
			function () {
				console.log("Async: Copying to clipboard was successful!");
			},
			function (err) {
				console.error("Async: Could not copy text: ", err);
			}
		);
	};

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		handleCopyToClipboard(value as string);
		setAnchorEl(event.currentTarget);

		setTimeout(() => {
			setAnchorEl(null);
		}, 1000);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? value : undefined;

	return (
		<>
			{value ? (
				<>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.info_row_div}>
						<Avatar sx={avatarStyles}>
							{type === "City" ? (
								<LocationCityRounded sx={iconStyles} />
							) : type === "Email" ? (
								<EmailRounded sx={iconStyles} />
							) : type === "Phone" ? (
								<LocalPhoneRounded sx={iconStyles} />
							) : type === "IG" ? (
								<Instagram sx={iconStyles} />
							) : type === "Link" ? (
								<InsertLinkRounded sx={iconStyles} />
							) : null}
						</Avatar>
						<div className={styles.info_data_div} onClick={handleClick}>
							{isLink ? (
								<Link href={value} target="_blank" rel="noopener noreferrer">
									{truncateLink(value as string, 25)}
								</Link>
							) : (
								<>{value}</>
							)}
							{isLink ? null : (
								<div className={styles.copy_icon_div}>
									<ContentCopyRounded
										aria-describedby={id}
										sx={{
											height: "15px",
											width: "15px",
											color: "secondary.main",
										}}
									/>
								</div>
							)}
						</div>
						{isLink ? null : (
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								sx={{
									zIndex: "4000",
								}}
								onClose={handleClose}>
								<div className={styles.popover_div}>Copied To Clipboard</div>
							</Popover>
						)}
					</div>
				</>
			) : null}
		</>
	);
}

export default InfoValuesDesktop;
