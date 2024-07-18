import { Flex } from "@chakra-ui/react";

interface Props {
	currentSize: string;
	size: string;
	setCurrentSize: (size: string) => void;
}

const SizeBox = ({ currentSize, size, setCurrentSize }: Props) => {
	return (
		<Flex
			border={`2px solid ${currentSize === size ? "gray" : "darkgrey"}`}
			cursor="pointer"
			justify="center"
			align="center"
			w="45px"
			h="40px"
			borderRadius={5}
			onClick={() => setCurrentSize(size)}
		>
			{size}
		</Flex>
	);
};

export default SizeBox;
