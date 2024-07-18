import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Spinner,
	Textarea,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../app/features/category/categoryApiSlice";
import { removeAllImages } from "../../app/features/image/imageSlice";
import { useAddProductMutation } from "../../app/features/product/productApiSlice";
import { removeAllVariants } from "../../app/features/variant/variantSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	ImageUploadContainer,
	InputErrorMessage,
	ProductVariant,
} from "../../components";
import { segments } from "../../utilities/data";
import { FormFields, productSchema } from "../../validations/productValidation";

const ProductAddPage = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(productSchema),
	});
	const { data: categories } = useGetCategoriesQuery();
	const variants = useAppSelector((state) => state.variants);
	const toast = useToast();
	const [addProduct] = useAddProductMutation();
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (Array.isArray(errors.variants)) {
			errors.variants.forEach((error) => {
				if (error.hexColor) {
					toast({
						title: error?.hexColor?.message,
						duration: 1200,
						isClosable: true,
						status: "error",
						position: "top-right",
					});
				}

				if (error.size) {
					toast({
						title: error?.size?.message,
						duration: 1200,
						isClosable: true,
						status: "error",
						position: "top-right",
					});
				}

				if (error.image) {
					toast({
						title: error?.image?.message,
						duration: 1200,
						isClosable: true,
						status: "error",
						position: "top-right",
					});
				}
			});

			return;
		}

		if (errors.variants)
			toast({
				title: errors.variants.message,
				duration: 1200,
				isClosable: true,
				status: "error",
				position: "top-right",
			});
	}, [errors, toast]);

	useEffect(() => {
		if (variants.length > 0) setValue("variants", variants);
	}, [variants]);

	const onSubmit = async (body: FormFields) => {
		try {
			const data = await addProduct({
				data: { ...body, variants },
				token: user?.token ?? "",
			}).unwrap();
			if (data) {
				dispatch(removeAllVariants());
				dispatch(removeAllImages());
				navigate("/dashboard/products");
			}
		} catch (err) {
			toast({
				title: "An error occrred",
				duration: 1200,
				isClosable: true,
				status: "error",
				position: "top",
			});
		}
	};

	return (
		<Flex
			w="100%"
			direction="column"
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			p={8}
			gap={5}
		>
			<HStack align="start" gap={10} w="100%">
				<VStack
					spacing={3}
					flex={1}
					align="start"
					bg="white"
					p={5}
					borderRadius={5}
				>
					<FormControl>
						<FormLabel fontSize="sm">Name*</FormLabel>
						<Input
							type="text"
							variant="filled"
							{...register("name")}
							autoComplete="off"
							bg="white"
							borderColor="#ced4da"
							borderWidth={1}
							_hover={{ bg: "white", borderWidth: 2 }}
						/>
						{errors.name && (
							<InputErrorMessage>
								{errors.name.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel fontSize="sm">Description*</FormLabel>
						<Textarea
							variant="filled"
							{...register("description")}
							bg="white"
							borderColor="#CED4DA"
							borderWidth={1}
							_hover={{ bg: "white", borderWidth: 2 }}
							height="15.6rem"
						/>
						{errors.description && (
							<InputErrorMessage>
								{errors.description.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel>Category</FormLabel>
						<Select
							variant="filled"
							{...register("categoryId")}
							bg="white"
							borderColor="#CED4DA"
							borderWidth={1}
							_hover={{ bg: "white", borderWidth: 2 }}
						>
							<option value=""></option>
							{categories?.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</Select>

						{errors.categoryId && (
							<InputErrorMessage>
								{errors.categoryId.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel>Segment</FormLabel>
						<Select
							variant="filled"
							{...register("segment")}
							bg="white"
							borderColor="#CED4DA"
							borderWidth={1}
							_hover={{ bg: "white", borderWidth: 2 }}
						>
							{segments.map((segment) => (
								<option
									key={segment.name}
									value={segment.value}
								>
									{segment.name}
								</option>
							))}
						</Select>
						{errors.segment && (
							<InputErrorMessage>
								{errors.segment.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel fontSize="sm">Selling Price*</FormLabel>
						<NumberInput defaultValue={0}>
							<NumberInputField
								{...register("sellingPrice", {
									valueAsNumber: true,
								})}
								bg="white"
								borderColor="#CED4DA"
								borderWidth={1}
								_hover={{ bg: "white", borderWidth: 2 }}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						{errors.sellingPrice && (
							<InputErrorMessage>
								{errors.sellingPrice.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel fontSize="sm" textDecoration="line-through">
							Crossed Price
						</FormLabel>
						<NumberInput defaultValue={0}>
							<NumberInputField
								{...register("crossedPrice", {
									valueAsNumber: true,
								})}
								bg="white"
								borderColor="#CED4DA"
								borderWidth={1}
								_hover={{ bg: "white", borderWidth: 2 }}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						{errors.crossedPrice && (
							<InputErrorMessage>
								{errors.crossedPrice.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel fontSize="sm">Cost per item</FormLabel>
						<NumberInput defaultValue={0}>
							<NumberInputField
								{...register("costPerItem", {
									valueAsNumber: true,
								})}
								bg="white"
								borderColor="#CED4DA"
								borderWidth={1}
								_hover={{ bg: "white", borderWidth: 2 }}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						{errors.costPerItem && (
							<InputErrorMessage>
								{errors.costPerItem.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<Checkbox defaultChecked {...register("isNew")}>
						Is New
					</Checkbox>
				</VStack>

				<Flex direction="column" gap={5} w="50%">
					<ImageUploadContainer />
					<ProductVariant />
				</Flex>
			</HStack>
			<Button
				type="submit"
				variant="solid"
				colorScheme="messenger"
				w="12%"
				disabled={isSubmitting}
			>
				{isSubmitting ? <Spinner /> : "Save Product"}
			</Button>
		</Flex>
	);
};

export default ProductAddPage;
