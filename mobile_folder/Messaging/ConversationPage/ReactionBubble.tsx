/** @format */

import { Avatar } from "@mui/material";
import {
	ThumbUpAltRounded,
	QuestionMarkRounded,
	PriorityHighRounded,
} from "@mui/icons-material";

interface ReactionBubbleProps {
	rightOrLeft: "right" | "left";
	type: {
		sender: "Thumb" | "?" | "!" | null;
		reciver: "Thumb" | "?" | "!" | null;
	};
}

function ReactionBubble({ rightOrLeft, type }: ReactionBubbleProps) {
	const fromMe = rightOrLeft === "right";
	const fromThem = rightOrLeft === "left";
	const themColor = "#f8dca1ff";
	const meColor = "#9ca1a3ff";

	const selectedColor =
		fromMe && type.reciver !== null
			? themColor
			: fromMe && type.sender !== null
			? meColor
			: fromThem && type.reciver !== null
			? meColor
			: fromThem && type.sender !== null
			? themColor
			: "white";

	const leftAbsolute = {
		height: "25px",
		width: "25px",
		position: "absolute",
		left: "-12.5px",
		top: "-5px",
		backgroundColor: "#212d37ff",
		border: `1px solid ${selectedColor}`,
		color: selectedColor,
	};
	const rightAbsolute = {
		height: "25px",
		width: "25px",
		position: "absolute",
		right: "-12.5px",
		top: "-5px",
		backgroundColor: "#212d37ff",
		border: `1px solid ${selectedColor}`,
		color: selectedColor,
	};
	const iconStyle = {
		width: "15px",
		height: "15px",
	};

	function iconSelector() {
		if (fromMe && type.reciver === "Thumb") {
			return <ThumbUpAltRounded sx={iconStyle} />;
		} else if (fromMe && type.reciver === "!") {
			return <PriorityHighRounded sx={iconStyle} />;
		} else if (fromMe && type.reciver === "?") {
			return <QuestionMarkRounded sx={iconStyle} />;
		} else if (fromThem && type.reciver === "Thumb") {
			return <ThumbUpAltRounded sx={iconStyle} />;
		} else if (fromThem && type.reciver === "!") {
			return <PriorityHighRounded sx={iconStyle} />;
		} else if (fromThem && type.reciver === "?") {
			return <QuestionMarkRounded sx={iconStyle} />;
		} else if (fromMe && type.sender === "Thumb") {
			return <ThumbUpAltRounded sx={iconStyle} />;
		} else if (fromThem && type.sender === "Thumb") {
			return <ThumbUpAltRounded sx={iconStyle} />;
		} else if (fromMe && type.sender === "!") {
			return <PriorityHighRounded sx={iconStyle} />;
		} else if (fromThem && type.sender === "!") {
			return <PriorityHighRounded sx={iconStyle} />;
		} else if (fromMe && type.sender === "?") {
			return <QuestionMarkRounded sx={iconStyle} />;
		} else if (fromThem && type.sender === "?") {
			return <QuestionMarkRounded sx={iconStyle} />;
		}
	}

	return (
		<>
			{type.sender === null && type.reciver === null ? null : (
				<Avatar
					sx={
						rightOrLeft === "right"
							? rightAbsolute
							: rightOrLeft === "left"
							? leftAbsolute
							: null
					}>
					{iconSelector()}
				</Avatar>
			)}
		</>
	);
}

export default ReactionBubble;
