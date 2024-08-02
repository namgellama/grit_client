import { Hero1Img, Hero2Img } from "@/assets";
import { Box, Grid, Image } from "@chakra-ui/react";

const Hero = () => {
	return (
		<Box>
			<Grid templateColumns="repeat(2, 1fr)" gap={1}>
				<Image
					src={Hero1Img}
					width="100%"
					height="100%"
					objectFit="cover"
					alt="Hero Image"
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
