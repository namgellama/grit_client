import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/features/auth/authApiSlice";
import { RegisterRequestDTO } from "../../app/interfaces/auth";
import {
	FormFields,
	registerSchema,
} from "../../validations/registerValidation";
import InputErrorMessage from "./InputErrorMessage";

const SignUpForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const handleShowConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);
	const toast = useToast();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(registerSchema),
	});
	const [registerUser] = useRegisterMutation();
	const navigate = useNavigate();

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

	const onSubmit = async (body: Partial<RegisterRequestDTO>) => {
		const { name, phoneNumber, email, password, confirmPassword } = body;

		if (password !== confirmPassword) {
			setError("password", {
				message: "Passwords do not match",
			});
			setError("confirmPassword", {
				message: "Passwords do not match",
			});
		}

		try {
			const userData = {
				name,
				phoneNumber,
				email,
				password,
			};
			const newUser = await registerUser(userData).unwrap();

			if (newUser) navigate("/login");
		} catch (err: any) {
			setError("root", {
				message: err.data.message ?? "Something went wrong.",
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
				<FormLabel>Name*</FormLabel>
				<Input
					type="text"
					variant="filled"
					background="white"
					placeholder="Enter your phone number"
					{...register("name")}
				/>
				{errors.name && (
					<InputErrorMessage>{errors.name.message}</InputErrorMessage>
				)}
			</FormControl>

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
				<FormLabel>Email</FormLabel>
				<Input
					type="email"
					variant="filled"
					background="white"
					placeholder="Enter your email"
					{...register("email")}
				/>
				{errors.email && (
					<InputErrorMessage>
						{errors.email.message}
					</InputErrorMessage>
				)}
			</FormControl>

			<FormControl>
				<FormLabel>Password*</FormLabel>
				<InputGroup>
					<Input
						type={showPassword ? "text" : "password"}
						variant="filled"
						background="white"
						placeholder="Enter your password"
						{...register("password")}
					/>
					<InputRightElement
						cursor="pointer"
						onClick={handleShowPassword}
					>
						{showPassword ? <IoEyeOff /> : <IoEye />}
					</InputRightElement>
				</InputGroup>
				{errors.password && (
					<InputErrorMessage>
						{errors.password.message}
					</InputErrorMessage>
				)}
			</FormControl>

			<FormControl>
				<FormLabel>Confirm Password*</FormLabel>
				<InputGroup>
					<Input
						type={showConfirmPassword ? "text" : "password"}
						variant="filled"
						background="white"
						placeholder="Enter your password"
						{...register("confirmPassword")}
					/>
					<InputRightElement
						cursor="pointer"
						onClick={handleShowConfirmPassword}
					>
						{showConfirmPassword ? <IoEyeOff /> : <IoEye />}
					</InputRightElement>
				</InputGroup>
				{errors.confirmPassword && (
					<InputErrorMessage>
						{errors.confirmPassword.message}
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
				{isSubmitting ? <Spinner /> : "Sign Up"}
			</Button>
		</VStack>
	);
};

export default SignUpForm;
