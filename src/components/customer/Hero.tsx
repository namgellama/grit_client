import { Box, Image } from "@chakra-ui/react";
import heroImg from "../../assets/hero-img.png";

const Hero = () => {
	return (
		<Box width="100vw" height="85vh">
			<Image
				src={heroImg}
				width="100%"
				height="100%"
				objectFit="cover"
				alt="Hero Image"
			/>
		</Box>
	);
};

export default Hero;
