import { Variant } from "../features/variant/variantSlice";
import { Category } from "./category";

export interface Product {
	id: string;
	name: string;
	description: string;
	sellingPrice: number;
	crossedPrice: number;
	segment: string;
	isNew: boolean;
	createdAt: Date;
	updateAt: Date;
	categoryId: string;
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
