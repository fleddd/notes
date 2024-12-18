import { API_URL } from "../constants/apiURL.ts";
import { ResponseError } from "../helpers/ResponseError.ts";

type Response = {
	token: string;
	email: string;
	userName: string;
};

export async function login(
	userName: string,
	password: string,
) {
	const response = await fetch(`${API_URL}account/login`, {
		method: "POST",
		body: JSON.stringify({
			userName: userName,
			password: password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		const errorText = await response.text()
		throw new ResponseError(errorText, response);
	}
	return (await response.json());



}

export async function register(
	email: string,
	password: string,
	userName: string,
): Promise<Response> {
	const response = await fetch(`${API_URL}account/register`, {
		method: "POST",
		body: JSON.stringify({ email, password, userName }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		const errorText = await response.text()
		throw new ResponseError(errorText, response);
	}
	return await response.json();
}

export function save(token: string, email: string, userName: string) {
	localStorage.setItem("token", token);
	localStorage.setItem("email", email);
	localStorage.setItem("userName", userName);
}

export function load() {
	return {
		token: localStorage.getItem("token"),
		email: localStorage.getItem("email"),
		userName: localStorage.getItem("userName"),
	};
}

export function logout() {
	localStorage.removeItem("token");
	localStorage.removeItem("email");
	localStorage.removeItem("userName");
}
