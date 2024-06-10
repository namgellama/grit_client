import { z } from "zod";

export const categorySchema = z.object({
	name: z.string().min(1, "Name is required"),
	image: z.string().min(1, "Image is required"),
});

export type FormFields = z.infer<typeof categorySchema>;
