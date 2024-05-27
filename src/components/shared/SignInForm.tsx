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
import { InputErrorMessage } from "..";
import { useLoginMutation, User } from "../../app/auth/authApiSlice";
import { setUser } from "../../app/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { FormFields, loginSchema } from "../../validations/loginValidation";

const SignInForm = () => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
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
			const token = await login(body).unwrap();
			dispatch(setUser(token));
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
				<InputGroup>
					<Input
						type={show ? "text" : "password"}
						variant="filled"
						background="white"
						placeholder="Enter your password"
						{...register("password")}
					/>
					<InputRightElement cursor="pointer" onClick={handleClick}>
						{show ? <IoEyeOff /> : <IoEye />}
					</InputRightElement>
				</InputGroup>
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