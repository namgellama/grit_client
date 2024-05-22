import { Box, Tooltip } from "@chakra-ui/react";
import { Color } from "../../app/product/productApiSlice";

interface Props {
	color: Color;
	handleColorChange: (color: string) => void;
}

const ColorBox = ({ color, handleColorChange }: Props) => {
	return (
		<Tooltip key={color.hexColor} label={color.colorName}>
			<Box
				w={3}
				h={3}
				background={color.hexColor}
				cursor="pointer"
				onClick={() => handleColorChange(color.image)}
			></Box>
		</Tooltip>
	);
};

export default ColorBox;
