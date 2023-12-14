/** @format */

import type { Metadata } from "next";
import "react-quill/dist/quill.bubble.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme } from "./muiprovider";
import LocalizationProviderHelper from "./LocalizationProviderHelper";
import SocketWrapperHelper from "./SocketWrapperHelper";
import LayoutWrapper from "./LayoutWrapper";
import "../theme-variables.css";
import "./global.css";
import awsExports from "../aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure({ ...awsExports, ssr: true });

export const revalidate = 0;
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });
/* 
export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}; */

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<meta
				property="og:image"
				content="https://example.com/images/cool-page.jpg"
			/>
			<LocalizationProviderHelper>
				<ThemeProvider theme={darkTheme}>
					<SocketWrapperHelper>
						<LayoutWrapper>
							<CssBaseline />
							<body className={inter.className}>{children}</body>
						</LayoutWrapper>
					</SocketWrapperHelper>
				</ThemeProvider>
			</LocalizationProviderHelper>
		</html>
	);
}
