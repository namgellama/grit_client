import { Box, Tooltip } from "@chakra-ui/react";
import { Variant } from "../../app/interfaces/product";

interface Props {
	variant: Variant;
	currentColor: string;
	handleColorChange: (image: string, currentColor: string) => void;
}

const ColorBox = ({ variant, currentColor, handleColorChange }: Props) => {
	return (
		<Tooltip key={variant.hexColor} label={variant.color}>
			<Box
				w={3}
				h={3}
				background={variant.hexColor}
				cursor="pointer"
				boxShadow={
					variant.color === currentColor
						? `0 0 0 2px #fff, 0 0 0 4px ${variant.hexColor}`
						: "none"
				}
				onClick={() => handleColorChange(variant.image, variant.color)}
			></Box>
		</Tooltip>
	);
};

export default ColorBox;
