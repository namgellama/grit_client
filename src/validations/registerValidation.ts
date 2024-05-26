import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(1, "Name is required"),
	phoneNumber: z
		.string()
		.min(1, "Phone number must be 10 digits.")
		.max(10, "Phone number must be 10 digits."),
	email: z.string().optional(),
	password: z.string().min(1, "Password is required."),
	confirmPassword: z.string().min(1, "Please confirm your password"),
});

export type FormFields = z.infer<typeof registerSchema>;
