import { z } from "zod";

const SEGMENT = ["MEN", "WOMEN"] as const;

export const productSchema = z.object({
	name: z.string().min(1, "Name is required."),
	description: z.string().min(1, "Description is required."),
	image: z.string().min(1, "Image is required."),
	price: z.number({ message: "Price is required" }),
	segment: z.enum(SEGMENT, { message: "Invalid value" }),
	isNew: z.boolean(),
	onSale: z.boolean(),
	categoryId: z.string().min(1, "Category is required"),
});

export type FormFields = z.infer<typeof productSchema>;
