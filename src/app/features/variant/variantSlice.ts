import { createSlice } from "@reduxjs/toolkit";

export interface Variant {
	id?: string;
	color: string;
	hexColor: string;
	size: string;
	image: string;
	stock: number;
}

const initialState: Variant[] = [];

const variantSlice = createSlice({
	name: "variants",
	initialState,
	reducers: {
		addColorVariant: (state, action) => {
			state.push(action.payload);
		},

		updateVariantSize: (state, action) => {
			const { color, size } = action.payload;
			const variant = state.find(
				(v) => v.color === color && v.size.length < 1
			);
			if (variant) {
				variant.size = size;
			} else {
				state.push(action.payload);
			}
		},

		updateVariantImage: (state, action) => {
			const { color, size, image } = action.payload;

			const variant = state.find(
				(v) => v.color === color && v.size === size
			);

			if (variant) variant.image = image;
		},

		removeVariant: (state, action) => {
			return state.filter((x) => x.color !== action.payload);
		},

		removeSizeVariant: (state, action) => {
			const filteredState = state.filter(
				(x) => x.size === action.payload
			);

			const exceptActionPayload = state.filter(
				(x) => x.size !== action.payload
			);

			if (state.length <= 1) {
				filteredState.map((x) => (x.size = ""));
			} else if (
				filteredState.length > 1 &&
				exceptActionPayload.length < 1
			) {
				filteredState.map((x) => (x.size = ""));
			} else {
				return state.filter((x) => x.size !== action.payload);
			}
		},

		updateVariantStock: (state, action) => {
			const { color, size, stock } = action.payload;
			const variant = state.find(
				(x) => x.color === color && x.size === size
			);
			if (variant) variant.stock = stock;
		},

		removeAllVariants: () => {
			return [];
		},
	},
});

export const {
	addColorVariant,
	updateVariantSize,
	updateVariantImage,
	removeVariant,
	removeSizeVariant,
	updateVariantStock,
	removeAllVariants,
} = variantSlice.actions;

export default variantSlice.reducer;
