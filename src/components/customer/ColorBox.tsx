import { Variant } from "@/app/features/variant/variantSlice";
import { Box, Tooltip } from "@chakra-ui/react";

interface Props {
	variant: Variant;
	currentColor: string;
	handleColorChange: (image: string, currentColor: string) => void;
	small: boolean;
}

const ColorBox = ({
	variant,
	currentColor,
	handleColorChange,
	small,
}: Props) => {
	return (
		<Tooltip key={variant.hexColor} label={variant.color}>
			<Box
				w={small ? 3 : 7}
				h={small ? 3 : 7}
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
