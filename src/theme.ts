import { extendTheme, theme as base } from "@chakra-ui/react";
import "@fontsource/open-sans";

const theme = extendTheme({
	fonts: {
		heading: `Open Sans, ${base.fonts.heading}`,
		body: `Open Sans, ${base.fonts.heading}`,
	},
});

export default theme;
