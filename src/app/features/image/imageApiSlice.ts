import { apiSlice } from "../../apiSlice";
import { Image } from "../../interfaces/image";

export const imageApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addImage: builder.mutation<Image, FormData>({
			query: (data) => ({
				url: `https://api.cloudinary.com/v1_1/${
					import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
				}/image/upload`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useAddImageMutation } = imageApiSlice;
