import { Variant } from "@/app/features/variant/variantSlice";
import { Category } from "./category";

export interface Product {
	id: string;
	name: string;
	description: string;
	sellingPrice: number;
	crossedPrice: number;
	segment: "MEN" | "WOMEN";
	isNew: boolean;
	createdAt: Date;
	updateAt: Date;
	categoryId: string;
	costPerItem: number;
	category: Category;
	variants: Variant[];
}

export interface ProductCreate {
	id: string;
	name: string;
	description: string;
	image: string;
	sellingPrice: number;
	crossedPrice: number;
	costPerPrice: number;
	segment: string;
	isNew: boolean;
	createdAt: Date;
	updateAt: Date;
	categoryId: string;
	category: Category;
	variants: Partial<Variant>[];
}
