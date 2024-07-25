import {
	addImage,
	deleteImage,
	removeAllImages,
} from "@/app/features/image/imageSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Product } from "@/app/interfaces/product";
import { ImageUpload } from "@/components";
import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ImageUploadContainer = ({ product }: { product?: Product }) => {
	const images: string[] = useAppSelector((state) => state.images);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		dispatch(removeAllImages());
		if (product) {
			const productImages = new Set(product.variants.map((x) => x.image));
			dispatch(addImage(productImages));
		}
	}, [product]);

	return (
		<Box bg="white" p={3}>
			<Text fontSize="sm" fontWeight="semibold" mb={2}>
				Product Images
			</Text>

			<Flex
				align="center"
				gap={2}
				overflowX="scroll"
				className="scrollbarX"
			>
				{images.length > 0 && (
					<Flex gap={2}>
						{images.map((image, index) => (
							<Box
								key={index}
								width="120px"
								height="120px"
								position="relative"
							>
								<Image
									src={image}
									alt={`Uploaded Image ${index + 1}`}
									w="100%"
									h="100%"
									objectFit="cover"
									borderRadius={5}
								/>
								<Box
									position="absolute"
									top={1}
									right={1}
									bg="blueviolet"
									cursor="pointer"
									onClick={() => dispatch(deleteImage(image))}
								>
									<RxCross2 color="white" fontSize="20px" />
								</Box>
							</Box>
						))}

						{isLoading && (
							<Skeleton width="120px" height="120px"></Skeleton>
						)}
					</Flex>
				)}

				<ImageUpload setIsLoading={setIsLoading} />
			</Flex>
		</Box>
	);
};

export default ImageUploadContainer;
