import dotenv from "dotenv";

dotenv.config();

const ghAuthURL = 'https://github.com/login/oauth/authorize'
const { VITE_CLIENT_ID } = process.env;

export async function get(req) {
	const sessionId = '1234'
	return {
		status: 302,
		headers: {
			location: `${ghAuthURL}?client_id=${VITE_CLIENT_ID}&state=${sessionId}`
		}
	}
}
