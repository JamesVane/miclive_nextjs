/** @format */
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Button, Divider, TextField } from "@mui/material";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import SpotifyAutocomplete from "./SpotifyAutocomplete";

interface AddSongProps {
	closeModal: () => void;
}

function AddSong({ closeModal }: AddSongProps) {
	const [selectedProvider, setSelectedProvider] = useState<
		"spotify" | "apple" | "soundcloud" | ""
	>("");

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedProvider(event.target.value as any);
	};
	const [spotifyValue, setSpotifyValue] = useState(null);
	const [spotifyValueParent, setSpotifyValueParent] = useState(null);

	return (
		<>
			<div className={styles.modal_title}>Add Song</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
			<FormControl
				fullWidth
				sx={{
					width: "calc(100% - 20px)",
					marginTop: "20px",
				}}>
				<InputLabel id="provider-select-label">Platform</InputLabel>
				<Select
					sx={{ width: "200px" }}
					labelId="provider-select-label"
					id="provider-select"
					value={selectedProvider}
					label="Platform"
					onChange={handleChange}>
					<MenuItem value={"spotify"}>Spotify</MenuItem>
					<MenuItem value={"apple"}>Apple Music</MenuItem>
					<MenuItem value={"soundcloud"}>SoundCloud</MenuItem>
				</Select>
			</FormControl>
			<SpotifyAutocomplete
				value={spotifyValue}
				setValue={setSpotifyValue}
				setValueParent={setSpotifyValueParent}
			/>

			<Button
				startIcon={<CheckRounded />}
				color="success"
				size="large"
				variant="outlined"
				sx={{
					position: "absolute",
					right: "15px",
					bottom: "10px",
				}}>
				save
			</Button>
			<Button
				onClick={closeModal}
				startIcon={<CloseRounded />}
				color="secondary"
				size="large"
				variant="outlined"
				sx={{
					position: "absolute",
					left: "15px",
					bottom: "10px",
				}}>
				cancel
			</Button>
		</>
	);
}

export default AddSong;
