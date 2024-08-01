import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().min(1, "Email is required"),
	password: z.string().min(1, "Password is required."),
	confirmPassword: z.string().min(1, "Please confirm your password"),
});

export type FormFields = z.infer<typeof registerSchema>;
