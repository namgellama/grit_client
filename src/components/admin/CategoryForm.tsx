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
import { useCreateCategoryMutation } from "../../app/features/category/categoryApiSlice";
import { useAppSelector } from "../../app/hooks";
import {
	categorySchema,
	FormFields,
} from "../../validations/categoryValidation";
import InputErrorMessage from "../shared/InputErrorMessage";
import CategoryImageUpload from "./CategoryImageUpload";

interface Props {
	onClose: () => void;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryForm = ({ onClose, setIsEdit }: Props) => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(categorySchema),
	});
	const [createCategory] = useCreateCategoryMutation();
	const { user } = useAppSelector((state) => state.auth);
	const [isLoading, setIsLoading] = useState(false);

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
		setIsEdit(false);
	};
	console.log(getValues("image"));

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
					setValue={setValue}
					setIsLoading={setIsLoading}
				/>
				{isLoading && (
					<Skeleton
						mt={5}
						width="250px"
						height="250px"
						isLoaded={!isLoading}
					></Skeleton>
				)}
				{getValues("image") && (
					<Image
						mt={5}
						width="250px"
						height="250px"
						objectFit="cover"
						src={getValues("image")}
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
