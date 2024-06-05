export interface User {
	id: string;
	name: string;
	phoneNumber: string;
	email?: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}

export interface CurrentUser extends User {
	token: string;
}

export interface RegisterRequestDTO {
	name: string;
	phoneNumber: string;
	email?: string;
	password: string;
	confirmPassword: string;
}
