import { useToast } from "@chakra-ui/react";
import { Group, MantineProvider, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhotoPlus, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useAddImageMutation } from "../../app/features/image/imageApiSlice";
import { useAppSelector } from "../../app/hooks";
import { FormFields } from "../../validations/categoryValidation";

interface Props {
	setValue: UseFormSetValue<FormFields>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryImageUpload = ({ setValue, setIsLoading }: Props) => {
	const images = useAppSelector((state) => state.images);

	const presetKey = import.meta.env.VITE_CLOUDINARY_PRESET_KEY;
	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
	const [addImageMutation, { isLoading }] = useAddImageMutation();
	const toast = useToast();

	useEffect(() => {
		setIsLoading(isLoading);
	}, [isLoading]);

	const onDrop = async (files: File[]) => {
		const formData = new FormData();
		formData.append("file", files[0]);
		formData.append("upload_preset", presetKey);
		formData.append("cloud_name", cloudName);

		try {
			const response = await addImageMutation(formData).unwrap();
			setValue("image", response.secure_url);
		} catch (error: any) {
			toast({
				title: error.error,
				duration: 1200,
				isClosable: true,
				status: "error",
				position: "top-right",
			});
		}
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

export default CategoryImageUpload;
