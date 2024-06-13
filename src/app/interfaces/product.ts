import { Category } from "./category";

export interface Product {
	id: string;
	name: string;
	color: Color[];
	description: string;
	image: string;
	price: number;
	stock: number;
	sizes: string[];
	segment: string;
	ageStatus: string;
	saleStatus: string;
	createdAt: Date;
	updateAt: Date;
	categoryId: string;
	category: Category;
}

export interface Color {
	hexColor: string;
	colorName: string;
	image: string;
}
