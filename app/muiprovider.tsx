/** @format */

"use client";
/** @format */

import { createTheme } from "@mui/material/styles";
export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#898661",
		},
		secondary: {
			main: "#BBBAB9FF",
		},
		background: {
			default: "#0f0f0fff",
			paper: "#272727",
		},
		error: {
			main: "#ff0000",
		},
		info: {
			main: "#1e1d15ff",
		},
		text: {
			primary: "#dddccfff",
			secondary: "#C9C8BBFF",
			disabled: "#B5B4A7FF",
		},
	},
	typography: {
		fontFamily: ["Roboto", "sans-serif"].join(","),
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
            .ql-container.ql-snow {
              font-family: 'Roboto', sans-serif;
            }
            .ql-editor {
              font-family: 'Roboto', sans-serif;
            }
          `,
		},
	},
});
