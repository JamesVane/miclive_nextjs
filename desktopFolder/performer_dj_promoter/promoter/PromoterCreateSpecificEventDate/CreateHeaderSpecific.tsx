/** @format */

import React from "react";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import _ from "lodash";

function CreateHeaderSpecific({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();

	// const noEvents = _.isEqual(promoterEventInfoState, defaultPromoterEventInfo);

	return <div className={styles.header_wrapper}>{children}</div>;
}

export default CreateHeaderSpecific;
