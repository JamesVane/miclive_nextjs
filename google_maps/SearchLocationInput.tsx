/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import styles from "./styles.module.css";

const GOOGLE_MAPS_API_KEY = "AIzaSyAi5lUojgfx83PlZ_NSsNzko9oPI2uqCLc";

function loadScript(src: string, position: HTMLElement | null, id: string) {
	if (!position) {
		return;
	}

	const script = document.createElement("script");
	script.setAttribute("async", "");
	script.setAttribute("id", id);
	script.src = src;
	position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
	offset: number;
	length: number;
}
export type StructuredFormatting = {
	main_text: string;
	secondary_text: string;
	main_text_matched_substrings?: MainTextMatchedSubstrings[];
};
export type PlaceType = {
	description: string;
	structured_formatting: StructuredFormatting;
};

interface GoogleMapsProps {
	setValueParent: (value: {
		name: string;
		cords: { lat: number; lng: number };
	}) => void;
	value: PlaceType | null;
	setValue: (value: PlaceType | null) => void;
}
export default function GoogleMaps({
	value,
	setValue,
	setValueParent,
}: GoogleMapsProps) {
	const [inputValue, setInputValue] = React.useState("");
	const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
	const loaded = React.useRef(false);

	if (typeof window !== "undefined" && !loaded.current) {
		if (!document.querySelector("#google-maps")) {
			loadScript(
				`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
				document.querySelector("head"),
				"google-maps"
			);
		}

		loaded.current = true;
	}

	const fetch = React.useMemo(
		() =>
			debounce(
				(
					request: { input: string },
					callback: (results?: readonly PlaceType[]) => void
				) => {
					(autocompleteService.current as any).getPlacePredictions(
						request,
						callback
					);
				},
				400
			),
		[]
	);

	React.useEffect(() => {
		let active = true;

		if (!autocompleteService.current && (window as any).google) {
			autocompleteService.current = new (
				window as any
			).google.maps.places.AutocompleteService();
		}
		if (!autocompleteService.current) {
			return undefined;
		}

		if (inputValue === "") {
			setOptions(value ? [value] : []);
			return undefined;
		}

		fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
			if (active) {
				let newOptions: readonly PlaceType[] = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<Autocomplete
			id="google-map-demo"
			sx={{ width: "90%", marginTop: "20px" }}
			getOptionLabel={(option) =>
				typeof option === "string" ? option : option.description
			}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			ListboxProps={{
				style: {
					backgroundColor: "#0a0e13ff",
					borderRadius: "5px",
				},
			}}
			PaperComponent={({ children }) => (
				<Paper
					sx={{ width: "100%", height: "100%", backgroundColor: "#0a0e13ff" }}>
					{children}
				</Paper>
			)}
			noOptionsText="No locations"
			onChange={(event: any, newValue: PlaceType | null) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);

				if (newValue) {
					const geocoder = new google.maps.Geocoder();
					geocoder.geocode(
						{ address: newValue.description },
						(results, status) => {
							if (status === "OK") {
								const lat = results![0].geometry.location.lat();
								const lng = results![0].geometry.location.lng();
								console.log(`Latitude: ${lat}, Longitude: ${lng}`);
								setValueParent({
									name: newValue!.description,
									cords: { lat: lat, lng: lng },
								});
							} else {
								console.error(
									`Geocode was not successful for the following reason: ${status}`
								);
							}
						}
					);
				}
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => (
				<TextField {...params} label="Add a location" fullWidth />
			)}
			renderOption={(props, option) => {
				const matches =
					option.structured_formatting.main_text_matched_substrings || [];

				const parts = parse(
					option.structured_formatting.main_text,
					matches.map((match: any) => [
						match.offset,
						match.offset + match.length,
					])
				);

				return (
					<li className={styles.list_item} {...props}>
						<Grid container alignItems="center">
							<Grid item sx={{ display: "flex", width: 44 }}>
								<LocationOnIcon sx={{ color: "text.secondary" }} />
							</Grid>
							<Grid
								item
								sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
								{parts.map((part, index) => (
									<Box
										key={index}
										component="span"
										sx={{ fontWeight: part.highlight ? "bold" : "regular" }}>
										{part.text}
									</Box>
								))}
								<Typography variant="body2" color="text.secondary">
									{option.structured_formatting.secondary_text}
								</Typography>
							</Grid>
						</Grid>
					</li>
				);
			}}
		/>
	);
}
