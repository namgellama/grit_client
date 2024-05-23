import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Image,
	Input,
	Spinner,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation, User } from "../../app/auth/authApiSlice";
import logo from "../../assets/hero-img.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputErrorMessage from "../components/InputErrorMessage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCredentials } from "../../app/auth/authSlice";
import { useEffect } from "react";

const schema = z.object({
	phoneNumber: z
		.string()
		.min(1, "Phone number must be 10 digits.")
		.max(10, "Phone number must be 10 digits."),
	password: z.string().min(1, "Password is required."),
});

type FormFields = z.infer<typeof schema>;

const SignInPage = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(schema),
	});
	const [login] = useLoginMutation();
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const toast = useToast();

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

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
		<HStack>
			<Image src={logo} w="50%" h="100vh" objectFit="cover" />
			<Container w="50%" centerContent>
				<VStack spacing={8} w="400px" alignItems="start">
					<Box>
						<Heading size="xl">Sign in to your account</Heading>
						<Text mt={2}>
							Don't have and account?{" "}
							<Link to="/register">
								<Text as="span" color="blue" ml={1}>
									Sign up
								</Text>
							</Link>
						</Text>
					</Box>
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
				</VStack>
			</Container>
		</HStack>
	);
};

export default SignInPage;
