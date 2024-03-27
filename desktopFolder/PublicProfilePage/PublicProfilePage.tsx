/** @format */

import React from "react";
import styles from "./styles.module.css";
import rapper_background_dev from "@/images/rapper_background_dev.webp";
import Image from "next/image";
import AvatarSimple from "@desk/AvatarSimple";
import { Avatar, IconButton } from "@mui/material";
import { IosShareRounded } from "@mui/icons-material";
import EmailWidget from "./EmailWidget";
import YoutubePlayer from "./YoutubePlayer";
import EventDateProfileCard from "./EventDateProfileCard";
import ProfilePageLinkComponent from "./ProfilePageLinkComponent";
import SpotifyComponent from "./SpotifyComponent";
import horizLogo from "@/images/miclive_svg_horiz.svg";
// 850 / 340

function PublicProfilePage() {
	const tempIgUrl =
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png";
	const tempTikTok =
		"https://img.freepik.com/premium-vector/tiktok-iconsocial-media-vectortik-tok-logo-design_340607-135.jpg";

	const tempSnap =
		"data:image/jpeg;base64,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";

	const tempSpotify =
		"data:image/png;base64,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";

	const tempApple =
		"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBIQEA8REA8PERUPEBEQDQ8QEBUQFRIWGBUdExgZKCggGBolHBUWIjIhJyotLi8uFx8zODMxQyguLi4BCgoKDQ0OGxAQFS0mICUtKy0tLSstNy0rLS0tKy8tLS0tLS0tLS0tLS8tLS0tKy0tLS8tLi4tLS0tLS0vLy0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQIEBgcFAwj/xABDEAACAgEBAgkKAwUGBwAAAAAAAQIRAwQGIQUHEjFBUWFxsRMyM3JzgZGhsvAiUsE0QpKi0RQjJENiglNjk6OzwvH/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAYBAgMFB//EADURAAIBAgIHBwMDBAMAAAAAAAABAgMRBCEFEjEyQVGBBjRxkaGxwWGy0ROCwhQiUvAjQkP/2gAMAwEAAhEDEQA/AO4gGPqtTDFFznJRhFW2/ve+wGUm3ZGQa9wntXp8Nxg/LTX/AA2uQn2y/pZq/D+0mTUtwg3jw83JupSX+t/pzd54lnGVXke/hNDq2tXfRfL/AB5nv6va/VT81xxL/RBN12uV/KjzJ8LamXPqM3d5WaXwW4w7FnJts9mnhqNPKMEuiPpPUTfPOT75yZ82xYswdbIEE2LBkgE2LAIBNiwCATYsAgE2LAIJFiwAmfSOea5pyXdJo+diwYauZcOFtTHm1Gb/AK06+F0enpdrdVj85xyrqnBJ12ONfOzwbFmU2jlPD0aitKCfRHQeDNrMGWo5E8M3+dryf8XR70jYU73renzHHbPY4C2iy6ZqMryYemDe9dsH0Ps5n8zpGrzPHxeho21qGT5P4f58zpgMXR6uGaEcmOXKjLmfin1PsMo7lfaadmgAAYBzbarht6nJyIP+5xv8PVKX5n+nZ3mz7acI+R0/Ii6nnbh2qH77+aX+451Zwqy4IsOhsIrfryX0j8v48wBYs4nvgCxYAAsWAALFgACxYAAsWAALFgACxYAAsWAALFgACxYAAsWAezszw09JlqTbxZGlOPV1SXavmvcdLjJNJp2nvTW9NHG7N/2H4S8rh8lJ3LDSj7Ovw/Cmu6jtSlnY8LTOETj+vFZrJ+HB/HkbQADuVw5vtzquXquR0Yoxguq6cn9SXuNfMvhzJytTnf8Azsldym0vkkYRDbu7l7w1NU6MILgl7Z+pYFQYO9iwKgCxYFQBYsCoAsWBU++m0ebL6PHknX5Mcp+AuGrK72HyB7Om2S1mTnxrGuvJNL5K38j1dNsJJ+l1CXWscXL5uvA2UJPgQ6mPwsN6oumftc1Eg6Np9jdJHzlkyevkpfyUenp+CNPj8zBjVdPk4uXxe83VKRCqabw8d1N+i9/g5dp9Fmy+jxZMldMMcpL4o9XTbJauf+Wsa68k0vkrfyOmA2VJcWQqmnKj3KaXjn+DR9PsNJ15XPFdaxwcvg3Xgerg2N0sed5Z+tNL6UjYwbqnFcCFPSeLn/6NeGXtY5ptZwJHSyg8bfk8idKTtxlGrV9K3r4M8I3bjF8zB60/CJo5wmkpZFl0dUlVw0ZTd3n6NosCoNCdYsCoAsWPa2N1fk9XBdGVSxS96tfzRXxPDMjg3LyM+Kf5MkJfCaf6BOzucq1NVKcoPimjsQAJpQbnGdXkvJN9c5P4tnysq2SQT6IthNiyADJNiyAATYsgAE2Tji5NJb3JpJdr3IqZPBXp8Xtcf1oGHkrnSuCtn8GnglyI5JpfiyTgpScunk35q7EeyATUkth8/qVZ1Za05Xf1AAMmgAAAAAAAABpnGN5mD1p+ETR7N34yPMwetPwiaORam8y5aJ7pDr7smxZAOZ6RNiyAATYT8CB/QGY7yO0eWiQYHLBL1ihfoI5JYIBEL8SCAASCAASCAASZXBXp8Xtsf1oxDL4K9Pi9rj+tA1lsfX2OygAnHzsAFZySVtpJdL3IAsDytTtBpMfnanG31Ql5R/CFs8nVbc6aO6EMs36sYR+bv5GjnFcSVTwOJqbtJ+VvV2RtYOf6nb3K/R4ccfXlLI/lyTx9VtRrMl3nlFPoxqOOu5pX8zV1ok6noPEy3ml1v7X9zqs5pK20l1t0hCaatNNPmado4vqNTPI7nOU31zm5v4s3vi6m/I5Y3ujkTS6m476+AjV1naxnGaI/p6LqfqXatla3rf4Pnxk+Zg9afhE0Q3rjK8zB60/CJohyqbzPb0R3OHX3ZIIBzPSJBAAJJKkr9AZis0dXABJKUcnBWxZFLqWBWxYBYFbFgFgVsWAWMrgn9ow+1x/WjDsy+CX/AIjD7bH9aBrLdfX2Ozmh8JbdTU5RwYocmLceVk5UuUk+dJVXxZvhw5vnJNaTWSKtoXCUa+vKpG9rW5Z3/HHI9rVbV63Jf984p9GOKh8Gt/zPLz6rJkd5Mksj65zlN/FnwsWR277Sz06NOnuRS8Fb2LArYswdCwK2LALG/cW3os3tF9Jz+zoHFr6LN7RfSb0t48zTHdJdPdFOMvzMHrT8ImiG98ZnmYPWn4RNCszV3mZ0P3OHX7mWBWxZzPSLArYsAsF09xWxfgYNo7UdaABKKQcjABGLsAAAAAAAAADM4J/aMPtsf1owzK4J/aMPtsf1oGJbr6+x2o4Y+nvO5nC30953r8Cu9nd2r+3+QABwLGAAAAAADoXFp6HN7RfSc9Og8Wnoc3tF9JvS30eZpjucunuinGZ5mD1p+ETQTfuM30eD1p+ETQTNXeZnQ/c4dfuYABzPSAAABK/QgL9DBtHeR1sAEoo5yKxZUEUvBaxZUAFrFlQAWsWVABazL4Gf+Iwe2x/WjCMzgb9ow+2x/Wgaz3X/ALwO2HCm+fvO6nCH095Ir8Cu9nd2r+3+RNiyoI5ZC1iyoALWLKgAtZ0Piz9Dm9ovpOdHROLL0Ob2kfpOlLeR5eme5y6e6KcZ3o8HrT8ImgWb/wAZ/o8HrT8InPhV3mZ0N3OHX7mWsWVBzPTLWLKgAtYsqT/QG0d5HXgQCUUU5DYsoCKXovYsoAC9iygAL2LKAAvZl8DP/EYPbY//ACRMEzuBP2rT9ubGv+5EGs91+DO2nB2+fvO8HBZdPed6/ArnZzdq/s/kWsWUBwLKXsWUPU2f4Ey6zLyIfhhGnkm1cYxfi3TpdgSb2GlScacXObsltZ5xm6TgjU5knjwZZRfNJY58j+Lm+Z1DgvZrS6ZJxxKc1/mZEpzvs6I+6j2zuqD4sr1ftBBNqlTv9Xl6L8nLdJsPrJ1yljxrp5eRN13Qs3zZ/geOjw+Si3Jt8ucnuubSW5dCpJUesDrCnGOZ4+M0nXxUdWdkuSX5u/U0fjP8zB68/pic/s3/AI0PR4PXn4ROekervMtGhu5w6/cy9iygOZ6hexZQAF7FlCf6GDMd5HYAASyiHHrFkAiF7JsWVAM2LWLIJim2kk220kkrbbdJJdLBgWZOj4PzZvRYcmTfVxxzkk+1rcvedA2c2LxYoqeoisuZ73CVPFHsrmk+u92/d1vb8cFFJJJJbkkqSR3jQb2lfxWn6VOWrRjrfXYunF+OXVZnLdJsPrZ+dGGL2mReEOUbJs/sXHTZI5suRZJwfKhGMagpdDbe+TXRzG4g6xoxR5GI01i60XG6SfJfLuwcEk+fvO9nA5PxOeI4HpdnN2r+z+RNiyoI5ZrFrOvbH8HrBo8Sr8WWKzT6+VNJ7+5UvccfXOu87hwRlU9PgkuaWHHJe+CZ3oW1ivdopSVGEVsbz6LL3ZmgAlFSAAANE40Zfh0y6XLI/go/1Of2bdxl6xTzwwp35GFy7JzptfwqD95qBCq5zZfdE03DB00+Tfm216E2LKg5no2LWLKgCxaxZUkGY7yOxAgEsoRx1reD6a2NZZrqnJfCTPiQy+LNFgVAM2LG08XWgWXVPJJWsEHNe0cko/K33pGqG68V2es2bG/38Skv9slf1m9NLXVyDpNyjhKjjtt6NpP0udKABPPnwAABWTSVvoOCN7/gdk2p1y0+kzTbpuDxw5r8pNNKu7n7kzjNkXEPNItnZym1SqT4NxXknf7kWBUEcsdiTf8Ai92gjyf7JllTTbwyb3O3bh322113XQr5+EzaEnF3RFxmEhiqTpz6Pk+f+8Dv4OR8Gbb6zCqlKOaPR5VSnJL1k0377PRycY2evw4MKfW3N/K14kpV4FUnoHGKVo2a53/NmdLPA2j2jxaODtqed+ZjT3pvmc10R8ejs0DX7a67NuWSOFPnWKPJ/mdyXuZr8ptttttt22222+tvpZpKvdf2k3Cdn2pKWIkrclfPxeXp5ovqM8sk5TnJuc5NuT53Ju2VKgjFnsWBUAzYsCoAsWIX9SBfN7/AG0F/cvE7T5MHpeSQJ1j5x+vE4ntHDk6vULmrUZf4XkfJ+TR5xs/GPo/J6xy6M0I5F1WlyWv5L95q5Cas2i/4SoqlCE+cV52z9SQQDBIJMrgrhCWmzQzQ54Sum6TVVJPsabRiAyayjGScZK6eT8DuPBXCWLVY1kxStPzovzoy6YzXQ/8A6j0Tgug1+XTS5eHJLHLm/DLnXVJczXY00bLh4wdZFU44Z9ssM0/5ZJfIkxxCtmVPEdnqqlejJOP1dmvSzOqmJr9diwQeTLkjjiumT6a5kudvsW85fq9vNdk82cMXs8Uf/flGv6vW5c0uVlyTyS/NOcpNJ9CvmXYg8QuCFHs5Vb/5ZpL6Zv1suuZ7W120ctdkSgmsGO+RF8765S7ezoXezXyARm23dlpo0YUYKnBWSJBAMHUkEAAkEAAkEAAkEAAkEAAkEAAky+CcHlM+HH+fNjj/ABTS/UwzYtgNE82uxv8AdxJ5n3R3R/maMpXaRxxFRU6Upvgm/JHYAAeifM7Go8YvBLz6ZZIq56dub63idcv4VGXdFnKz9ASimqe9Pc0+Y5Btps69Hl5cU/7PlbeNrmjJ73F9vV1ruZFrws9YtnZ7HJxeGk89sflfK8Wa7YsgEa5aCbFkAXBNiyAZuCbFkAxcE2LIAuCbFkAXBNiyALgmxZAFwTYsgC4JsWQBcE2LIAuCbFkAXBNnUOLfgnyOCWeSqeoacevyK5n722+7kml7I7Py12ZWmsGOpZZ0/dGL/M/krfVfYsWOMEoxSUYpRikqSS3JIk0IXesVntBjlGH9NF5uzl9FtS67fBLmfUAEoqQMPhHQY9RjliyxU4TW9Po6mn0NdDMwAzFuLTTzRxvajZTNo5Ocby6dv8M0vN6lkS5n28z7Lo12z9Bzgmmmk01TTVprtNQ4b2C02ZynhbwTe+opeSfP0buT7nXYRJ4d/wDUtmB7Qwa1cSrP/JbH4pZ9VfwRyyxZsfCGw2twu4445Y1fKxSUn/DKpfBM8bU8FajF5+nyxr82HIvFHBpraWCliKNVXpzT8Gva9zFsWVa+9wv73GtyTqS5PyLWLK397hf3uFxqS5PyLWLK397hf3uFxqS5PyLWLK397hf3uFxqS5PyLWLK397hf3uFxqS5PyLWLK397hf3uFxqS5PyLWLK397hf3uFxqS5PyLWLKX97ifvoFzGpLk/ItYsytNwXqMvo8GWXq4Jy8EevwfsRrsvPiWKHXlkoL4b5fI2Sb2HCriKVJXqTS8WjXrPd2Y2Yza6SlTx4E6lkkqvrUF+8/kunqe6cDcX+nw1LPJ55rfyWuTh9655e912G4Y8ailGKUYxVJJJJJcyS6DvDDvbIr+O7QQinDDZv/J7F4J7etl9GYvBnB2LTYo4sUeTCPxb6XJ9LZnAEtZZFSlKUpOUndvaAADAAAAAAAAAMM+ebzTzsoBykSsPsPiQAYJIAAAAAAAAAAAALRAAPpiPSw8xANkRq+6fUAHQixAABkAAAAAA/9k=";
	const tempX =
		"data:image/png;base64,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";
	const tempYT =
		"data:image/png;base64,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";
	const tempSoundcloud =
		"data:image/png;base64,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";
	return (
		<>
			<div className={styles.mic_live_div}>
				<Image style={{ width: "88%" }} alt="logo" src={horizLogo} />
			</div>
			<div className={styles.desktop_background_back}>
				<Image
					style={{
						height: "100%",
						width: "100%",
						objectFit: "cover",
					}}
					alt="dev"
					src={rapper_background_dev}
				/>
			</div>
			<div className={styles.fade_overlay_desktop}>
				<div className={styles.front_desktop_background}>
					<Image
						style={{
							height: "100%",
							width: "100%",
							objectFit: "cover",
						}}
						alt="dev"
						src={rapper_background_dev}
					/>
				</div>
			</div>
			<div className={styles.main_div_desktop}>
				<div className={styles.desktop_content_div}>
					<EmailWidget />
					<div className={styles.desktop_top}>
						<div className={styles.pic_div_desktop}>
							<AvatarSimple
								ninety
								type="performer"
								username="estgee"
								id={208}
							/>
						</div>
						<div className={styles.desktop_top_right}>
							<div className={styles.person_name}>EST Gee</div>
							<div className={styles.tagline}>I NEVER FELT NUN</div>
						</div>
					</div>
					<div className={styles.events_container_desk}>
						<div className={styles.event_section_row}>
							<EventDateProfileCard />
							<EventDateProfileCard />
						</div>
					</div>
					<YoutubePlayer />
					{/* <ProfilePageLinkComponent
						// url={"https://www.youtube.com/watch?v=iFIvpsNpWLk"}
						url={"https://mui.com/material-ui/react-drawer/"}
					/> */}
					<SpotifyComponent url={"6QHlEUJAtLzAtb1ZmhSamg"} />
					<SpotifyComponent url={"6P5ulGKtC4x6RnFbzfpq8O"} />

					<ProfilePageLinkComponent url="https://www.est-gee.com/" />
					<ProfilePageLinkComponent url="https://cmgthelabel.shop/" />
				</div>
			</div>
			<div className={styles.font_fade_container}>
				<div className={styles.front_fade_div} />
			</div>
			<div className={styles.desktop_socials_div}>
				<IconButton
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
						border: "2px solid rgba(136, 134, 97, .2)",
					}}>
					<IosShareRounded
						color="primary"
						sx={{
							height: "45px",
							width: "45px",
							marginTop: "-5px",
						}}
					/>
				</IconButton>
				<Avatar
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
					}}>
					<img
						alt="IG"
						src={tempIgUrl}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</Avatar>
				<Avatar
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
					}}>
					<img
						alt="tiktok"
						src={tempTikTok}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</Avatar>
				<Avatar
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
					}}>
					<img
						alt="snap"
						src={tempSnap}
						style={{
							width: "120%",
							height: "120%",
							objectFit: "cover",
						}}
					/>
				</Avatar>
				<Avatar
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
					}}>
					<img
						alt="spotify"
						src={tempSpotify}
						style={{
							width: "150%",
							height: "150%",
							objectFit: "cover",
						}}
					/>
				</Avatar>
				<Avatar
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
					}}>
					<img
						alt="applemusic"
						src={tempApple}
						style={{
							width: "105%",
							height: "105%",
							objectFit: "cover",
						}}
					/>
				</Avatar>
				<Avatar
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
						backgroundColor: "#000000",
					}}>
					<img
						alt="x"
						src={tempX}
						style={{
							width: "70%",
							height: "70%",
							objectFit: "cover",
						}}
					/>
				</Avatar>
				<Avatar
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
					}}>
					<img
						alt="youtube"
						src={tempYT}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</Avatar>
				<Avatar
					sx={{
						height: "70px",
						width: "70px",
						marginBottom: "10px",
					}}>
					<img
						alt="soundcloud"
						src={tempSoundcloud}
						style={{
							width: "115%",
							height: "115%",
							objectFit: "cover",
							marginRight: "-2px",
						}}
					/>
				</Avatar>
			</div>
		</>
	);
}

export default PublicProfilePage;
