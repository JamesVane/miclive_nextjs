/** @format */

import React from "react";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import _ from "lodash";
import DividerH from "@/universalComponents/DividerH";

function CreateHeader({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();

	return (
		<div className={styles.header_wrapper}>
			<div className={styles.header_helper}>{children}</div>

			<DividerH />
		</div>
	);
}

export default CreateHeader;
