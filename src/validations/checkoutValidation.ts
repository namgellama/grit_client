import { z } from "zod";

const VALUES = ["Cash", "Esewa"] as const;

export const checkoutSchema = z.object({
	addressLine1: z.string().min(1, "Address line 1 is required."),
	addressLine2: z.string().min(1, "Address line 2 is required."),
	city: z.string().min(1, "Address line 2 is required."),
	postalCode: z.string().optional(),
	country: z.string().min(1, "Country is required"),
	paymentMethod: z.enum(VALUES, { message: "Invalid value" }),
});

export type FormFields = z.infer<typeof checkoutSchema>;
