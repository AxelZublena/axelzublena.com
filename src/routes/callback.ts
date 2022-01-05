import dotenv from "dotenv";
import fetch from 'node-fetch'

dotenv.config();

const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'
const { VITE_CLIENT_ID, VITE_CLIENT_SECRET } = process.env;


export async function get(request) {
	const code = request.url.searchParams.get("code");
	const accessToken = await getAccessToken(code)
	const user: any = await getUser(accessToken)

	// this mutates the locals object on the request
	// and will be read by the hooks/handle function
	// after the resolve
	request.locals.user = user.login

	return {
		status: 302,
		headers: {
			location: '/'
		}
	}
}

function getAccessToken(code) {
	return fetch(tokenURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			client_id: VITE_CLIENT_ID,
			client_secret: VITE_CLIENT_SECRET,
			code
		})
	}).then(r => r.json())
		.then(r => (<any>r).access_token)
}

function getUser(accessToken) {
	return fetch(userURL, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	})
		.then(r => r.json())

}
