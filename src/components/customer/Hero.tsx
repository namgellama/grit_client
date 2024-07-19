import { Grid, Image, Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import gritVideo from "../../assets/grit.mov";
import heroImg1 from "../../assets/hero1.jpg";
import heroImg2 from "../../assets/hero2.jpg";

const Hero = () => {
	return (
		<Box minHeight="100vh">
			<Grid templateColumns="repeat(3, 1fr)" gap={1}>
				<Image
					src={heroImg1}
					width="100%"
					height="100%"
					objectFit="cover"
					alt="Hero Image"
				/>
				<ReactPlayer
					url={gritVideo}
					playing
					width="100%"
					height="100%"
					loop
					muted
				/>
				<Image
					src={heroImg2}
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
