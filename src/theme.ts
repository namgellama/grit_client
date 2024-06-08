import { theme as base, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import "@fontsource/roboto";

const theme = extendTheme({
	styles: {
		global: () => ({
			body: {
				bg: "background.50",
			},
		}),
	},
	fonts: {
		heading: `Roboto, ${base.fonts.heading}`,
		body: `Open Sans, ${base.fonts.body}`,
	},
	fontSizes: {
		xxs: "0.7rem",
		xs: "0.75rem",
		sm: "0.875rem",
		md: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
		"3xl": "1.875rem",
		"4xl": "2.25rem",
		"5xl": "3rem",
		"6xl": "3.75rem",
		"7xl": "4.5rem",
		"8xl": "6rem",
		"9xl": "8rem",
	},
	fontWeights: {
		hairline: 100,
		thin: 200,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	},
	colors: {
		text: {
			light: "#ffffff",
			gray: "#ebebeb",
			dark: "#03160e",
		},
		background: {
			main: "#ffffff",
			50: "#f5f5f5",
			100: "#ebebeb",
			200: "#e7e7e7",
			300: "#bbbcbc",
			400: "#aeaeb2",
			500: "#6e6e6e",
			600: "#53565a",
			700: "#444444",
			800: "#1b1b1b",
			900: "#000000",
		},
	},
});

export default theme;
