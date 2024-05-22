import { Box, Tooltip } from "@chakra-ui/react";
import { Color } from "../../app/product/productApiSlice";

interface Props {
	color: Color;
	currentColorName: string;
	handleColorChange: (image: string, currentColorName: string) => void;
}

const ColorBox = ({ color, currentColorName, handleColorChange }: Props) => {
	return (
		<Tooltip key={color.hexColor} label={color.colorName}>
			<Box
				w={3}
				h={3}
				background={color.hexColor}
				cursor="pointer"
				boxShadow={
					color.colorName === currentColorName
						? `0 0 0 2px #fff, 0 0 0 4px ${color.hexColor}`
						: "none"
				}
				onClick={() => handleColorChange(color.image, color.colorName)}
			></Box>
		</Tooltip>
	);
};

export default ColorBox;
