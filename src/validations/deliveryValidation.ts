import { z } from "zod";

export const deliverySchema = z.object({
	addressLine1: z.string().min(1, "Address line 1 is required."),
	addressLine2: z.string().min(1, "Address line 2 is required."),
	city: z.string().min(1, "Address line 2 is required."),
	postalCode: z.string().optional(),
	country: z.string().min(1, "Country is required"),
});

export type FormFields = z.infer<typeof deliverySchema>;
