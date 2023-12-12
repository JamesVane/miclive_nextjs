/** @format */

import { Drawer } from "@mui/material";
import styles from "./styles.module.css";
import MessagingPageDesktop from "./MessagingPageDesktop/MessagingPageDesktop";
import ConversationPageDesktop from "./ConversationPageDesktop";

interface FloatingMessageDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	openConversationSub: string;
}

const FloatingMessageDrawer = ({
	isOpen,
	onClose,
	openConversationSub,
}: FloatingMessageDrawerProps) => {
	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={onClose}
			sx={{ zIndex: "10000" }}>
			<div className={styles.main_div}>
				{openConversationSub === "None" ? (
					<MessagingPageDesktop />
				) : (
					<ConversationPageDesktop openConversationSub={openConversationSub} />
				)}
			</div>
		</Drawer>
	);
};

export default FloatingMessageDrawer;
