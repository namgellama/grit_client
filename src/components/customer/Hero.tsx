import { GritVideo, Hero1Img, Hero2Img } from "@/assets";
import { Box, Grid, Image } from "@chakra-ui/react";
import ReactPlayer from "react-player";

const Hero = () => {
	return (
		<Box minHeight="100vh">
			<Grid templateColumns="repeat(3, 1fr)" gap={1}>
				<Image
					src={Hero1Img}
					width="100%"
					height="100%"
					objectFit="cover"
					alt="Hero Image"
				/>
				<ReactPlayer
					url={GritVideo}
					playing
					width="100%"
					height="100%"
					loop
					muted
				/>
				<Image
					src={Hero2Img}
					width="100%"
					height="100%"
					objectFit="cover"
					alt="Hero Image"
				/>
			</Grid>
		</Box>
	);
};

export default Hero;
