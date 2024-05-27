import { Flex } from "@chakra-ui/react";

interface Props {
	selectedSize: string;
	size: string;
	setSelectedSize: (size: string) => void;
}

const SizeBox = ({ selectedSize, size, setSelectedSize }: Props) => {
	return (
		<Flex
			border={`2px solid ${selectedSize === size ? "gray" : "darkgrey"}`}
			cursor="pointer"
			justify="center"
			align="center"
			w="50px"
			h="40px"
			borderRadius={5}
			onClick={() => setSelectedSize(size)}
		>
			{size}
		</Flex>
	);
};

export default SizeBox;
