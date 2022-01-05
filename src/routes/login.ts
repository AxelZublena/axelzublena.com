import dotenv from "dotenv";

dotenv.config();

const ghAuthURL = 'https://github.com/login/oauth/authorize'
const { VITE_CLIENT_ID } = process.env;

export async function get(request) {
	const sessionId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
	return {
		status: 302,
		headers: {
			location: `${ghAuthURL}?client_id=${VITE_CLIENT_ID}&state=${sessionId}`
		}
	}
}
