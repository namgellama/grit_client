import { Product } from "@/app/interfaces/product";
import { ColorBox } from "@/components";
import {
	Badge,
	Box,
	Card,
	CardBody,
	Flex,
	HStack,
	Image,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
	product?: Product;
	show: boolean;
}

const ProductCard = ({ product, show }: Props) => {
	const [currentImage, setCurrentImage] = useState(
		product?.variants[0].image ?? ""
	);
	const [currentColor, setCurrentColor] = useState(
		product?.variants[0].color ?? ""
	);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const uniqueColorVariants = Array.from(
		new Map(
			product?.variants.map((variant) => [variant.color, variant])
		).values()
	);

	const handleColorChange = (
		image: string | undefined,
		color: string | undefined
	) => {
		if (image && color)
			if (currentImage !== image) {
				setCurrentColor(color);
				setIsTransitioning(true);
				setTimeout(() => {
					setCurrentImage(image);
					setIsTransitioning(false);
				}, 200);
			}
	};

	return (
		<Card>
			<Link to={`/products/${product?.id}`}>
				<Box
					_hover={{ transform: "scale(1.01)" }}
					transition={"transform 0.1s ease-out"}
					w={{ base: "100%", md: "320px" }}
					h={{ base: "500px", md: "380px" }}
				>
					<Image
						src={currentImage}
						alt={product?.name}
						w="100%"
						h="100%"
						objectFit="cover"
						opacity={isTransitioning ? 0 : 1}
						transition="opacity 0.2s ease-in-out"
					/>
				</Box>
			</Link>

			<CardBody px={3} pt={3} pb={5}>
				<Link to={`/products/${product?.id}`} style={{ width: "100%" }}>
					<Text
						fontWeight={{
							base: "normal",
							md: "semibold",
						}}
						letterSpacing={1}
					>
						{product?.name}
					</Text>
				</Link>

				<Flex align="center" justify="space-between">
					<Flex align="center" gap={3}>
						{product &&
							product?.crossedPrice > product?.sellingPrice && (
								<Text
									fontWeight={{
										base: "normal",
										md: "semibold",
									}}
									textDecoration="line-through"
								>
									Rs. {product?.crossedPrice}
								</Text>
							)}

						<Text
							fontWeight={{
								base: "normal",
								md: "semibold",
							}}
							letterSpacing={1}
						>
							Rs. {product?.sellingPrice}
						</Text>
					</Flex>

					{product &&
						product?.crossedPrice > product?.sellingPrice && (
							<Badge
								variant="solid"
								colorScheme="green"
								borderRadius={10}
								px={2}
								fontWeight={{
									base: "normal",
									md: "semibold",
								}}
							>
								{product &&
									((product.crossedPrice -
										product.sellingPrice) /
										product.crossedPrice) *
										100}{" "}
								% OFF
							</Badge>
						)}
				</Flex>
				{show && (
					<HStack justifyContent="start" spacing={3} px={1} mt={2.5}>
						{uniqueColorVariants.map((variant) => (
							<ColorBox
								key={variant.id}
								variant={variant}
								currentColor={currentColor}
								handleColorChange={handleColorChange}
								small={show}
							/>
						))}
					</HStack>
				)}
			</CardBody>
		</Card>
	);
};

export default ProductCard;
