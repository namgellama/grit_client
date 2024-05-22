import { Box, Tooltip } from "@chakra-ui/react";
import { Color } from "../../app/product/productApiSlice";

interface Props {
	color: Color;
	setCurrentImage: (color: string) => void;
}

const ColorBox = ({ color, setCurrentImage }: Props) => {
	return (
		<Tooltip key={color.hexColor} label={color.colorName}>
			<Box
				w={3}
				h={3}
				background={color.hexColor}
				cursor="pointer"
				onClick={() => setCurrentImage(color.image)}
			></Box>
		</Tooltip>
	);
};

export default ColorBox;
