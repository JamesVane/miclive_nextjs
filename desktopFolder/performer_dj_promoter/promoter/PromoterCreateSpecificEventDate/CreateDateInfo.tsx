/** @format */

import React, { useEffect } from "react";
import {
	Paper,
	Button,
	TextField,
	InputAdornment,
	Snackbar,
	Alert,
} from "@mui/material";
import {
	ArrowForwardIosRounded,
	ConfirmationNumberRounded,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CreateHeaderSpecific from "./CreateHeaderSpecific";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import SearchLocationInput from "@/google_maps/SearchLocationInput";
import { NumericFormat } from "react-number-format";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import CreateDateCrumbs from "./CreateDateCrumbs";
import { RootState } from "@/store/rootStore";
import {
	setSpecificEventDate as setSpecificEvent,
	switchPageDate as switchPage,
	initialState,
	setLocationHelperDate as setLocationHelper,
} from "@/store/CreateEventDateSlice";
import {
	computeNewTime,
	computePerformerFromTime,
} from "@/generic_functions/date_formaters";
import { DateTime, Interval } from "luxon";
import _ from "lodash";

interface CreateDateInfoProps {
	dateErrorMessage: string;
	setDateErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

function CreateDateInfo({
	dateErrorMessage,
	setDateErrorMessage,
}: CreateDateInfoProps) {
	const dispatch = useDispatch();

	const [formIsValid, setFormIsValid] = React.useState<boolean>(false);
	const [rangeError, setRangeError] = React.useState<string | null>("");

	const { specificEvent, locationHelper } = useSelector(
		(state: RootState) => state.promoterCreateDate
	);

	useEffect(() => {
		if (
			specificEvent.start_date !== null &&
			specificEvent.start_time !== null &&
			specificEvent.end_time !== null
		) {
			if (
				!_.isEqual(specificEvent.location, initialState.specificEvent.location)
			) {
				if (
					specificEvent.early_bird_ticket_price &&
					specificEvent.regular_ticket_price &&
					specificEvent.early_bird_ticket_price <=
						specificEvent.regular_ticket_price
				) {
					if (
						specificEvent.early_bird_end_time &&
						DateTime.fromISO(specificEvent.start_date!).set({
							hour: specificEvent.start_time!.hour,
							minute: specificEvent.start_time!.minute,
						}) >= DateTime.fromISO(specificEvent.early_bird_end_time)
					) {
						if (
							specificEvent.total_performers &&
							specificEvent.total_ticket_amount &&
							specificEvent.total_performers !== 0 &&
							specificEvent.total_ticket_amount >=
								specificEvent.total_performers
						) {
							if (
								specificEvent.performer_track_limit === 1 ||
								(specificEvent.performer_track_limit !== 1 &&
									Boolean(
										specificEvent.performer_track_limit &&
											specificEvent.performer_track_limit &&
											specificEvent.time_per_performer /
												specificEvent.performer_track_limit >=
												30
									))
							) {
								if (
									specificEvent.time_per_performer &&
									specificEvent.time_per_performer >= 30 &&
									specificEvent.time_per_performer < 3600
								) {
									if (formIsValid === false) {
										setFormIsValid(true);
									}
								} else if (formIsValid === true) {
									setFormIsValid(false);
								}
							} else if (formIsValid === true) {
								setFormIsValid(false);
							}
						} else if (formIsValid === true) {
							setFormIsValid(false);
						}
					} else if (formIsValid === true) {
						setFormIsValid(false);
					}
				} else if (formIsValid === true) {
					setFormIsValid(false);
				}
			} else if (formIsValid === true) {
				setFormIsValid(false);
			}
		} else if (formIsValid === true) {
			setFormIsValid(false);
		}
	}, [specificEvent]);

	function handlePerformersTickets(
		type:
			| "total_ticket_limit"
			| "performer_track_limit"
			| "time_per_performer"
			| "total_performers",
		value: number | string | null
	) {
		if (type === "total_performers" && typeof value !== "string") {
			dispatch(
				setSpecificEvent({
					specificKey: "total_performers",
					specificValue: value,
				})
			);
			if (value && value > 5) {
				const newDate = computeNewTime(
					DateTime.fromObject(specificEvent.start_time!),
					DateTime.fromObject(specificEvent.end_time!),
					value
				);
				dispatch(
					setSpecificEvent({
						specificKey: "time_per_performer",
						specificValue: newDate!,
					})
				);
			}
		}
		if (type === "time_per_performer" && typeof value !== "string") {
			dispatch(
				setSpecificEvent({
					specificKey: "time_per_performer",
					specificValue: value,
				})
			);
			const newAmount = computePerformerFromTime(
				DateTime.fromObject(specificEvent.start_time!),
				DateTime.fromObject(specificEvent.end_time!),
				value!
			);
			dispatch(
				setSpecificEvent({
					specificKey: "total_performers",
					specificValue: newAmount!,
				})
			);
		}
		if (type === "performer_track_limit" && typeof value !== "string") {
			dispatch(
				setSpecificEvent({
					specificKey: "performer_track_limit",
					specificValue: value,
				})
			);
		}
		if (type === "total_ticket_limit" && typeof value !== "string") {
			dispatch(
				setSpecificEvent({
					specificKey: "total_ticket_amount",
					specificValue: value,
				})
			);
		}
	}

	useEffect(() => {
		if (
			specificEvent.total_performers !== 0 &&
			specificEvent.start_time &&
			specificEvent.end_time
		) {
			const newDate = computeNewTime(
				DateTime.fromObject(specificEvent.start_time!),
				DateTime.fromObject(specificEvent.end_time!),
				specificEvent.total_performers!
			);
			dispatch(
				setSpecificEvent({
					specificKey: "time_per_performer",
					specificValue: newDate!,
				})
			);
		}
		if (
			specificEvent.start_time &&
			specificEvent.start_date &&
			specificEvent.early_bird_end_time === null
		) {
			const baseDate = DateTime.fromISO(specificEvent.start_date);
			const newDate = baseDate.set({
				hour: specificEvent.start_time!.hour,
				minute: specificEvent.start_time!.minute,
			});
			dispatch(
				setSpecificEvent({
					specificKey: "early_bird_end_time",
					specificValue: newDate.toISO(),
				})
			);
		}
	}, [specificEvent.start_time, specificEvent.end_time]);

	useEffect(() => {
		if (specificEvent.total_ticket_amount! < specificEvent.total_performers!) {
			dispatch(
				setSpecificEvent({
					specificKey: "total_ticket_amount",
					specificValue: specificEvent.total_performers,
				})
			);
		}
	}, [specificEvent.total_performers]);

	const shouldDisableTime: TimePickerProps<DateTime>["shouldDisableTime"] = (
		value,
		view
	) =>
		view === "hours" &&
		value.hour === DateTime.fromObject(specificEvent.start_time!).hour;

	return (
		<>
			<Snackbar
				open={dateErrorMessage !== ""}
				autoHideDuration={6000}
				message={dateErrorMessage}>
				<Alert
					onClose={() => setDateErrorMessage("")}
					severity="error"
					sx={{ width: "100%" }}>
					{"You already have an existing event at this time"}
				</Alert>
			</Snackbar>
			<Paper className={styles.base_event_paper}>
				<Button
					disabled={!formIsValid}
					onClick={() => dispatch(switchPage({ page: "specificEventDesc" }))}
					endIcon={<ArrowForwardIosRounded />}
					variant="outlined"
					sx={{ position: "absolute", right: 10, bottom: 10 }}>
					Continue
				</Button>
				<CreateHeaderSpecific>Specific Event Information</CreateHeaderSpecific>
				<div className={styles.base_event_body_wrap}>
					<div
						className={styles.base_event_LRWrapper}
						style={{ borderRight: "#edefeaff 1px solid" }}>
						<DatePicker
							disablePast
							value={
								specificEvent.start_date
									? DateTime.fromISO(specificEvent.start_date)
									: null
							}
							onChange={(date: any) => {
								dispatch(
									setSpecificEvent({
										specificKey: "start_date",

										specificValue: date.toISO(),
									})
								);
							}}
							sx={{ width: "90%", marginTop: "20px" }}
							label="Select Date"
						/>
						<div className={styles.start_end_div}>
							<TimePicker
								disabled={specificEvent.start_date === null}
								value={
									specificEvent.start_time
										? DateTime.fromObject(specificEvent.start_time)
										: null
								}
								onChange={(time: any) => {
									dispatch(
										setSpecificEvent({
											specificKey: "start_time",
											specificValue: time.toObject(),
										})
									);
								}}
								label="Start Time"
							/>
							<TimePicker
								onError={(error) => setRangeError(error)}
								disabled={specificEvent.start_time === null}
								shouldDisableTime={shouldDisableTime}
								value={
									specificEvent.end_time
										? DateTime.fromObject(specificEvent.end_time)
										: null
								}
								onChange={(time: any) => {
									if (specificEvent.start_time) {
										let adjustedTime = time;
										const startTime = DateTime.fromObject(
											specificEvent.start_time
										);
										if (time < startTime) {
											adjustedTime = adjustedTime.plus({ day: 1 });
											dispatch(
												setSpecificEvent({
													specificKey: "end_time",
													specificValue: adjustedTime.toObject(),
												})
											);
										} else if (
											Interval.fromDateTimes(startTime, adjustedTime).length(
												"hours"
											) > 24
										) {
											adjustedTime = adjustedTime.minus({ day: 1 });
											dispatch(
												setSpecificEvent({
													specificKey: "end_time",
													specificValue: adjustedTime.toObject(),
												})
											);
										} else {
											dispatch(
												setSpecificEvent({
													specificKey: "end_time",
													specificValue: adjustedTime.toObject(),
												})
											);
										}
									}
								}}
								label="End Time"
							/>
							<div className={styles.error_range}>
								{rangeError ? "event must be longer than 1hr" : null}
							</div>
						</div>
						<SearchLocationInput
							setValue={(value: any) => {
								dispatch(setLocationHelper(value));
							}}
							value={locationHelper}
							setValueParent={(value: any) => {
								console.log("location", value);
								dispatch(
									setSpecificEvent({
										specificKey: "location",
										specificValue: value,
									})
								);
							}}
						/>
						<div className={styles.start_end_div}>
							<TextField
								label="Regular Price"
								value={
									specificEvent.regular_ticket_price
										? specificEvent.regular_ticket_price
										: undefined
								}
								onChange={(e) =>
									dispatch(
										setSpecificEvent({
											specificKey: "regular_ticket_price",
											specificValue: Number(
												e.target.value.replace("$", "").replace(",", "")
											),
										})
									)
								}
								InputProps={{
									inputComponent: NumericFormat as any,
									inputProps: {
										prefix: "$",
										thousandSeparator: true,
										decimalScale: 2,
										min: 0,
									},
									endAdornment: (
										<InputAdornment position="end">
											<ConfirmationNumberRounded />
										</InputAdornment>
									),
								}}
							/>
							<TextField
								error={
									specificEvent.early_bird_ticket_price! >
									specificEvent.regular_ticket_price!
								}
								label="Early-Bird Price"
								value={specificEvent.early_bird_ticket_price}
								onChange={(e) => {
									dispatch(
										setSpecificEvent({
											specificKey: "early_bird_ticket_price",
											specificValue: Number(
												e.target.value.replace("$", "").replace(",", "")
											),
										})
									);
								}}
								InputProps={{
									inputComponent: NumericFormat as any,
									inputProps: {
										prefix: "$",
										thousandSeparator: true,
										decimalScale: 2,
										min: 0,
									},
									endAdornment: (
										<InputAdornment position="end">
											<ConfirmationNumberRounded />
										</InputAdornment>
									),
								}}
							/>
							{specificEvent.early_bird_ticket_price! >
							specificEvent.regular_ticket_price! ? (
								<div
									className={styles.error_generic}
									style={{
										bottom: "-18px",
										right: "10px",
									}}>
									must be less than Regular Price
								</div>
							) : null}
						</div>
						<DateTimePicker
							disabled={specificEvent.start_time === null}
							disablePast
							maxDateTime={
								specificEvent.start_time
									? DateTime.fromISO(specificEvent.start_date!).set({
											hour: specificEvent.start_time!.hour,
											minute: specificEvent.start_time!.minute,
									  })
									: null
							}
							value={
								specificEvent.early_bird_end_time
									? DateTime.fromISO(specificEvent.early_bird_end_time)
									: null
							}
							onChange={(time: any) => {
								dispatch(
									setSpecificEvent({
										specificKey: "early_bird_end_time",
										specificValue: time.toISO(),
									})
								);
							}}
							sx={{ width: "90%", marginTop: "20px" }}
							label="Early-Bird End Time"
						/>
					</div>
					<div
						className={styles.base_event_LRWrapper}
						style={{ paddingBottom: "15px" }}>
						<TextField
							disabled={specificEvent.end_time === null}
							type="number"
							value={
								specificEvent.total_performers === null ||
								specificEvent.total_performers === undefined
									? ""
									: specificEvent.total_performers
							}
							onChange={(e) => {
								if (e.target.value) {
									handlePerformersTickets(
										"total_performers",
										Number(e.target.value)
									);
								} else {
									handlePerformersTickets("total_performers", null);
								}
							}}
							label="Total Performers"
							sx={{ width: "90%", marginTop: "20px" }}
						/>
						<TimePicker
							timeSteps={{ minutes: 1, seconds: 5 }}
							disabled={specificEvent.end_time === null}
							value={DateTime.fromObject({
								minute: Math.floor(specificEvent.time_per_performer / 60),
								second: specificEvent.time_per_performer % 60,
							})}
							onChange={(date: any) => {
								if (date && date.minute && date.second) {
									console.log("mmss", date);
									handlePerformersTickets(
										"time_per_performer",
										date.second + date.minute * 60
									);
								}
							}}
							views={["minutes", "seconds"]}
							format="mm:ss"
							label="Time Per Performer"
							sx={{ width: "90%", marginTop: "20px" }}
						/>

						<TextField
							type="number"
							error={
								specificEvent.performer_track_limit !== 1 &&
								Boolean(
									specificEvent.performer_track_limit &&
										specificEvent.performer_track_limit &&
										specificEvent.time_per_performer /
											specificEvent.performer_track_limit <
											30
								)
							}
							value={
								specificEvent.performer_track_limit === null
									? ""
									: specificEvent.performer_track_limit
							}
							onChange={(e) => {
								if (e.target.value) {
									handlePerformersTickets(
										"performer_track_limit",
										Number(e.target.value)
									);
								} else {
									handlePerformersTickets("performer_track_limit", null);
								}
							}}
							label="Performer Track Limit"
							sx={{ width: "90%", marginTop: "20px" }}
						/>
						{specificEvent.performer_track_limit !== 1 &&
						Boolean(
							specificEvent.performer_track_limit &&
								specificEvent.performer_track_limit &&
								specificEvent.time_per_performer /
									specificEvent.performer_track_limit <
									30
						) ? (
							<div
								className={styles.error_generic}
								style={{
									top: "229px",
									right: "30px",
								}}>
								track limit too large.
							</div>
						) : null}

						<TextField
							error={
								specificEvent.total_ticket_amount! <
								specificEvent.total_performers!
							}
							disabled={specificEvent.total_performers === 0}
							type="number"
							value={
								specificEvent.total_ticket_amount === null
									? ""
									: specificEvent.total_ticket_amount
							}
							onChange={(e) => {
								if (e.target.value) {
									handlePerformersTickets(
										"total_ticket_limit",
										Number(e.target.value)
									);
								} else {
									handlePerformersTickets("total_ticket_limit", null);
								}
							}}
							label="Total Ticket Limit"
							sx={{ width: "90%", marginTop: "20px" }}
						/>
						{specificEvent.total_ticket_amount! <
						specificEvent.total_performers! ? (
							<div
								className={styles.error_generic}
								style={{
									top: "305px",
									right: "30px",
								}}>
								Total ticket limit can not be less than total performers.
							</div>
						) : null}
					</div>
				</div>
				<CreateDateCrumbs />
			</Paper>
		</>
	);
}

export default CreateDateInfo;
