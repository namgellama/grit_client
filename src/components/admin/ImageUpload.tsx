import { Group, MantineProvider, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhotoPlus, IconUpload, IconX } from "@tabler/icons-react";
import axios from "axios";
import { addImage } from "../../app/features/image/imageSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const ImageUpload = () => {
	const images = useAppSelector((state) => state.images);
	const dispatch = useAppDispatch();

	const presetKey = import.meta.env.VITE_CLOUDINARY_PRESET_KEY;
	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

	const onDrop = async (files: File[]) => {
		const uploadPromises = files.map(async (file) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", presetKey);
			formData.append("cloud_name", cloudName);

			try {
				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
					formData
				);
				return response.data.secure_url;
			} catch (error) {
				console.error("Error uploading image to Cloudinary", error);
				return null;
			}
		});

		const uploadedImages = await Promise.all(uploadPromises);
		dispatch(addImage(uploadedImages.filter((url) => url !== null)));
	};

	return (
		<MantineProvider>
			<Dropzone
				onDrop={onDrop}
				onReject={(files) => console.log("rejected files", files)}
				maxSize={5 * 1024 ** 2}
				accept={IMAGE_MIME_TYPE}
				multiple={false}
				style={{
					width: images.length > 0 ? "120px" : "100%",
					height: images.length > 0 ? "120px" : "100%",
				}}
			>
				<Group
					justify="center"
					gap="xl"
					mih={90}
					style={{ pointerEvents: "none" }}
				>
					<Dropzone.Accept>
						<IconUpload
							style={{
								width: rem(52),
								height: rem(52),
								color: "var(--mantine-color-blue-6)",
							}}
							stroke={1.5}
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX
							style={{
								width: rem(52),
								height: rem(52),
								color: "var(--mantine-color-red-6)",
							}}
							stroke={1.5}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconPhotoPlus
							style={{
								width: rem(50),
								height: rem(50),
							}}
							stroke={1.5}
						/>
					</Dropzone.Idle>
				</Group>
			</Dropzone>
		</MantineProvider>
	);
};

export default ImageUpload;
