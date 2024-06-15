import { Category } from "./category";

export interface Product {
	id: string;
	name: string;
	description: string;
	image: string;
	price: number;
	segment: string;
	isNew: boolean;
	onSale: boolean;
	createdAt: Date;
	updateAt: Date;
	categoryId: string;
	category: Category;
	variants: Variant[];
}

export interface Variant {
	id: string;
	size: string;
	color: string;
	hexColor: string;
	stock: number;
	image: string;
}
