import {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
} from "@/app/features/category/categoryApiSlice";
import { useAppSelector } from "@/app/hooks";
import { Category } from "@/app/interfaces/category";
import { CategoryImageUpload, InputErrorMessage } from "@/components";
import { categorySchema, FormFields } from "@/validations/categoryValidation";
import {
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Skeleton,
	Spinner,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
	isEdit: boolean;
	category?: Category;
	onClose: () => void;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryForm = ({ isEdit, onClose, setIsEdit, category }: Props) => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(categorySchema),
	});
	const [createCategory] = useCreateCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();
	const { user } = useAppSelector((state) => state.auth);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState<string | undefined>(category?.image);

	useEffect(() => {
		if (isEdit && category) {
			setValue("name", category.name);
			setImage(category.image);
			setValue("image", category.image);
		} else {
			setImage("");
		}
	}, [category, isEdit]);

	useEffect(() => {
		if (errors.root?.message)
			toast({
				title: errors.root.message,
				duration: 1200,
				isClosable: true,
				status: "error",
				position: "top-right",
			});
	}, [errors.root]);

	const onSubmit = async (body: FormFields) => {
		if (isEdit) {
			try {
				await updateCategory({
					categoryId: category?.id!,
					data: body,
					token: user?.token ?? "",
				}).unwrap();
				onClose();
			} catch (error) {
				setError("root", {
					message: "Something went wrong",
				});
			}
			setIsEdit(false);
		} else {
			try {
				await createCategory({
					data: body,
					token: user?.token ?? "",
				}).unwrap();
				onClose();
			} catch (error) {
				setError("root", {
					message: "Something went wrong",
				});
			}
		}
	};

	return (
		<VStack
			as="form"
			spacing={7}
			w="100%"
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormControl>
				<FormLabel>Name</FormLabel>
				<Input
					type="text"
					variant="filled"
					background="white"
					placeholder="Enter category name"
					{...register("name")}
				/>
				{errors.name && (
					<InputErrorMessage>{errors.name.message}</InputErrorMessage>
				)}
			</FormControl>

			<FormControl>
				<FormLabel>Image</FormLabel>
				<CategoryImageUpload
					setImage={setImage}
					setIsLoading={setIsLoading}
					setValue={setValue}
				/>

				<Skeleton
					display={isLoading ? "block" : "none"}
					mt={5}
					width="250px"
					height="250px"
					isLoaded={!isLoading}
				></Skeleton>

				{!isLoading && image && (
					<Image
						mt={5}
						width="250px"
						height="250px"
						objectFit="cover"
						src={image}
						alt="Category Image"
					/>
				)}

				{errors.image && (
					<InputErrorMessage>
						{errors.image.message}
					</InputErrorMessage>
				)}
			</FormControl>

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
	);
};

export default CategoryForm;
