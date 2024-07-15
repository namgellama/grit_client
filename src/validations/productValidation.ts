import { z } from "zod";

const SEGMENT = ["MEN", "WOMEN", "UNISEX"] as const;

const VARIANTS = z.object({
	color: z.string().min(1, "Color is required"),
	size: z.string().min(1, "Size is required"),
	image: z.string().min(1, "Image is required"),
	stock: z.number({ message: "Stock is required" }),
});

export const productSchema = z.object({
	name: z.string().min(1, "Name is required."),
	description: z.string().min(1, "Description is required."),
	sellingPrice: z
		.number({ message: "Selling price is required" })
		.min(1, "Selling price should be more than 0"),
	crossedPrice: z.number().optional(),
	costPerItem: z.number().optional(),
	segment: z.enum(SEGMENT, { message: "Invalid value" }),
	isNew: z.boolean(),
	categoryId: z.string().min(1, "Category is required"),
	variants: z.array(VARIANTS, { message: "Variant is required" }),
});

export type FormFields = z.infer<typeof productSchema>;
