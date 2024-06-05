import { OrderItem } from "./order";
import { Product } from "./product";

export interface BagItem extends OrderItem {
	userId: string;
	product: Product;
}
