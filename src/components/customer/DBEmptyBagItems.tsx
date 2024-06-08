import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import emptyBagImage from "../../assets/empty-bag.png";

interface Props {
	onClose: () => void;
}

const DBEmptyBagItems = ({ onClose }: Props) => {
	const navigate = useNavigate();

	return (
		<VStack h="100%" justify="center">
			<Image src={emptyBagImage} alt="Empty bag" w="150px" />
			<Text
				fontSize="xs"
				fontWeight="semibold"
				textTransform="uppercase"
				letterSpacing={1}
			>
				Your bag is empty
			</Text>
			<Text fontSize="sm" letterSpacing={0.5}>
				There are no products in your bag
			</Text>
			<VStack w="50%" mt={5} spacing={3}>
				<Button
					w="100%"
					bg="background.900"
					color="white"
					fontWeight="normal"
					borderRadius={20}
					_hover={{ bg: "background.800" }}
					onClick={() => {
						navigate("/products?segment=MEN");
						onClose();
					}}
				>
					Shop Men
				</Button>
				<Button
					w="100%"
					bg="background.900"
					color="white"
					fontWeight="normal"
					borderRadius={20}
					_hover={{ bg: "background.800" }}
					onClick={() => {
						navigate("/products?segment=WOMEN");
						onClose();
					}}
				>
					Shop Women
				</Button>
			</VStack>
		</VStack>
	);
};

export default DBEmptyBagItems;
