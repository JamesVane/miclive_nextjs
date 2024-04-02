/** @format */

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSpotifyAccessToken } from "@/api_functions_no_auth/getSpotifyAccessToken";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "lodash";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.css";
import parse from "autosuggest-highlight/parse";
import axios, { AxiosResponse } from "axios";
import Avarar from "@mui/material/Avatar";
import { PersonRounded, HideImageRounded } from "@mui/icons-material";

interface SpotifyAutocompleteProps {
	value: any;
	setValue: any;
	setValueParent: any;
}

function SpotifyAutocomplete({
	value,
	setValue,
	setValueParent,
}: SpotifyAutocompleteProps) {
	const [artistInputValue, setArtistInputValue] = useState("");
	const [artistValue, setArtistValue] = useState<null | any>(null);
	const [artistOptions, setArtistOptions] = useState([] as any);
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState([] as any);

	const {
		status: accessTokenStatus,
		data: accessTokenData,
		error: accessTokenError,
		isFetching: accessTokenIsFetching,
		refetch: accessTokenRefetch,
	} = useQuery({
		queryKey: ["spotifyAccessToken"],
		queryFn: getSpotifyAccessToken,
	});

	function onInputChange() {
		if (accessTokenData) {
			axios
				.get("https://api.spotify.com/v1/search", {
					headers: {
						Authorization: `Bearer ${accessTokenData}`,
					},
					method: "GET",
					params: {
						q: `track%3A${inputValue}%2520artist%3A${artistInputValue}`,
						type: "track",
					},
				})
				.then((response: AxiosResponse) => {
					setOptions(response.data.tracks.items);
					console.log("response:", response.data.tracks.items);
				});
		}
	}

	function onInputChangeArtist() {
		if (accessTokenData) {
			axios
				.get("https://api.spotify.com/v1/search", {
					headers: {
						Authorization: `Bearer ${accessTokenData}`,
					},
					method: "GET",
					params: {
						q: `artist%3A${artistInputValue}`,
						type: "artist",
					},
				})
				.then((response: AxiosResponse) => {
					setArtistOptions(response.data.artists.items);
				});
		}
	}

	useEffect(() => {
		if (inputValue && inputValue.length > 2) {
			const debouncedReturn = debounce(() => {
				onInputChange();
			}, 2000);
			debouncedReturn();
		}
	}, [inputValue]);

	useEffect(() => {
		if (artistInputValue && artistInputValue.length > 2) {
			const debouncedReturn = debounce(() => {
				onInputChangeArtist();
			}, 2000);
			debouncedReturn();
		}
	}, [artistInputValue]);

	return (
		<>
			{accessTokenStatus === "pending" ? null : (
				<>
					<Autocomplete
						disabled={!artistValue}
						id="google-map-demo"
						sx={{ width: "90%", marginTop: "20px" }}
						getOptionLabel={(option) =>
							typeof option === "string" ? option : option.name
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
								sx={{
									width: "100%",
									height: "100%",
									backgroundColor: "#0a0e13ff",
								}}>
								{children}
							</Paper>
						)}
						noOptionsText="No Songs Found"
						onChange={(event: any, newValue: any) => {
							setOptions(newValue ? [newValue, ...options] : options);
							setValue(newValue);
						}}
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue);
						}}
						renderInput={(params) => (
							<TextField {...params} label="Search for a song" fullWidth />
						)}
						renderOption={(props, option) => {
							// const matches =
							// 	option.structured_formatting.main_text_matched_substrings || [];

							// const parts = parse(
							// 	option.structured_formatting.main_text,
							// 	matches.map((match: any) => [
							// 		match.offset,
							// 		match.offset + match.length,
							// 	])
							// );

							return (
								<>
									{option.name
										.toLowerCase()
										.includes(inputValue.toLowerCase()) &&
									option.artists
										.map((artist: any) => artist.name)
										.includes(artistValue.name) ? (
										<li {...props} className={styles.list_item}>
											<div className={styles.select_option_row}>
												<div className={styles.list_artist_img}>
													<div className={styles.track_image_deco}>
														{option &&
														option.album &&
														option.album.images &&
														option.album.images[0] &&
														option.album.images[0].url ? (
															<img
																src={option.album.images[0].url}
																alt={option.name}
																style={{
																	width: "100%",
																	height: "100%",
																	objectFit: "cover",
																}}
															/>
														) : (
															<HideImageRounded />
														)}
													</div>
												</div>
												{option.name}
											</div>
										</li>
									) : null}
								</>
							);
						}}
					/>
					<Autocomplete
						id="artist-search"
						sx={{ width: "90%", marginTop: "20px" }}
						getOptionLabel={(option) =>
							typeof option === "string" ? option : option.name
						}
						filterOptions={(x) => x}
						options={artistOptions}
						autoComplete
						includeInputInList
						filterSelectedOptions
						value={artistValue}
						ListboxProps={{
							style: {
								backgroundColor: "#0a0e13ff",
								borderRadius: "5px",
							},
						}}
						PaperComponent={({ children }) => (
							<Paper
								sx={{
									width: "100%",
									height: "100%",
									backgroundColor: "#0a0e13ff",
								}}>
								{children}
							</Paper>
						)}
						noOptionsText="No Artists Found"
						onChange={(event: any, newValue: any) => {
							setArtistOptions(newValue ? [newValue, ...options] : options);
							setArtistValue(newValue);
						}}
						onInputChange={(event, newInputValue) => {
							setArtistInputValue(newInputValue);
						}}
						renderInput={(params) => (
							<TextField {...params} label="Search for an artist" fullWidth />
						)}
						renderOption={(props, option) => {
							// const matches =
							// 	option.structured_formatting.main_text_matched_substrings || [];

							// const parts = parse(
							// 	option.structured_formatting.main_text,
							// 	matches.map((match: any) => [
							// 		match.offset,
							// 		match.offset + match.length,
							// 	])
							// );

							return (
								<li {...props} className={styles.list_item}>
									<div className={styles.select_option_row}>
										<div className={styles.list_artist_img}>
											<Avarar
												sx={{
													width: "30px",
													height: "30px",
												}}>
												{option &&
												option.images &&
												option.images[0] &&
												option.images[0].url ? (
													<img
														src={option.images[0].url}
														alt={option.name}
														style={{
															width: "100%",
															height: "100%",
															objectFit: "cover",
														}}
													/>
												) : (
													<PersonRounded />
												)}
											</Avarar>
										</div>
										{option.name}
									</div>
								</li>
							);
						}}
					/>
				</>
			)}
		</>
	);
}

export default SpotifyAutocomplete;
