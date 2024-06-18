import {
	Box,
	Button,
	Checkbox,
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
	VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCategoriesQuery } from "../../app/features/category/categoryApiSlice";
import {
	useAddProductMutation,
	useUploadProductImageMutation,
} from "../../app/features/product/productApiSlice";
import { useAppSelector } from "../../app/hooks";
import { InputErrorMessage, ProductVariant } from "../../components";
import { segments } from "../../utilities/data";
import { FormFields, productSchema } from "../../validations/productValidation";
import { Variant } from "../../app/interfaces/product";

const ProductAddPage = () => {
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(productSchema),
	});
	const { data: categories, isLoading, error } = useGetCategoriesQuery();
	const [
		uploadProductImage,
		// { isLoading: isProductLoading, error: productError },
	] = useUploadProductImageMutation();
	const [addProduct] = useAddProductMutation();
	const { user } = useAppSelector((state) => state.auth);

	const [variants, setVariants] = useState<Partial<Variant>[]>([]);

	const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const formData = new FormData();

			formData.append("image", e.target.files[0]);

			try {
				const response = await uploadProductImage(formData).unwrap();
				setValue("image", response.image.secure_url);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const onSubmit = async (body: FormFields) => {
		console.log(body);
		try {
			await addProduct({
				data: { ...body, variants },
				token: user?.token ?? "",
			}).unwrap();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box w="100%">
			<HStack align="start" p={8} gap={10}>
				<VStack
					as="form"
					spacing={3}
					flex={1}
					align="start"
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input
							type="text"
							variant="filled"
							background="white"
							{...register("name")}
						/>
						{errors.name && (
							<InputErrorMessage>
								{errors.name.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel>Image</FormLabel>
						<Input
							type="file"
							accept="image/"
							variant="filled"
							background="white"
							onChange={uploadFileHandler}
							// {...register("image")}
						/>

						{errors.image && (
							<InputErrorMessage>
								{errors.image.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel>Category</FormLabel>
						<Select
							variant="filled"
							bg="white"
							{...register("categoryId")}
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
						<FormLabel>Description</FormLabel>
						<Textarea
							variant="filled"
							bg="white"
							{...register("description")}
						/>
						{errors.description && (
							<InputErrorMessage>
								{errors.description.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel>Price</FormLabel>
						<NumberInput>
							<NumberInputField
								bg="white"
								{...register("price", { valueAsNumber: true })}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						{errors.price && (
							<InputErrorMessage>
								{errors.price.message}
							</InputErrorMessage>
						)}
					</FormControl>

					<FormControl>
						<FormLabel>Segment</FormLabel>
						<Select
							variant="filled"
							bg="white"
							{...register("segment")}
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

					<Checkbox defaultChecked {...register("onSale")}>
						On Sale
					</Checkbox>
					<Checkbox defaultChecked {...register("isNew")}>
						Is New
					</Checkbox>

					<Button
						type="submit"
						variant="solid"
						colorScheme="messenger"
						w="full"
						disabled={isSubmitting}
					>
						{isSubmitting ? <Spinner /> : "Submit"}
					</Button>
				</VStack>
				<ProductVariant setVariants={setVariants} />
			</HStack>
		</Box>
	);
};

export default ProductAddPage;
