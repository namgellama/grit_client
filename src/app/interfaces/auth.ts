export interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}

export interface CurrentUser extends User {
	token: string;
}

export interface RegisterRequestDTO {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}
