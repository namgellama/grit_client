import { Product } from "./product";

export interface Category {
	id: string;
	name: string;
	image: string;
	createdAt: Date;
	updatedtAt: Date;
	products: Product[];
}
