import { z } from "zod";

export const loginSchema = z.object({
	phoneNumber: z
		.string()
		.min(1, "Phone number must be 10 digits.")
		.max(10, "Phone number must be 10 digits."),
	password: z.string().min(1, "Password is required."),
});

export type FormFields = z.infer<typeof loginSchema>;
