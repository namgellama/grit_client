import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Spinner,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation, User } from "../../app/auth/authApiSlice";
import { setCredentials } from "../../app/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { FormFields, loginSchema } from "../../validations/loginValidation";
import InputErrorMessage from "./InputErrorMessage";

const SignInForm = () => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(loginSchema),
	});
	const [login] = useLoginMutation();
	const dispatch = useAppDispatch();

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

	const onSubmit = async (body: Partial<User>) => {
		try {
			const data = await login(body).unwrap();
			dispatch(setCredentials(data));
		} catch (error) {
			setError("root", {
				message: "Invalid phone number or password",
			});
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
				<FormLabel>Phone Number*</FormLabel>
				<Input
					type="text"
					variant="filled"
					background="white"
					placeholder="Enter your phone number"
					{...register("phoneNumber")}
				/>
				{errors.phoneNumber && (
					<InputErrorMessage>
						{errors.phoneNumber.message}
					</InputErrorMessage>
				)}
			</FormControl>

			<FormControl>
				<FormLabel>Password*</FormLabel>
				<Input
					type="password"
					variant="filled"
					background="white"
					placeholder="Enter your password"
					{...register("password")}
				/>
				{errors.password && (
					<InputErrorMessage>
						{errors.password.message}
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
				{isSubmitting ? <Spinner /> : "Sign In"}
			</Button>
		</VStack>
	);
};

export default SignInForm;
