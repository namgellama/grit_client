import { Box, Tooltip } from "@chakra-ui/react";
import { Color } from "../../app/product/productApiSlice";

const ColorBox = ({ color }: { color: Color }) => {
	return (
		<Tooltip key={color.hexColor} label={color.colorName}>
			<Box w={3} h={3} background={color.hexColor}></Box>
		</Tooltip>
	);
};

export default ColorBox;
