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

export interface ProductCreate {
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
	variants: Partial<Variant>[];
}

export interface Variant {
	id: string;
	size: string;
	color: string;
	hexColor: string;
	stock: number;
	image: string;
}

export interface Image {
	asset_id: string;
	display_name: string;
	secure_url: string;
	url: string;
	created_at: Date;
}
