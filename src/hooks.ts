import cookie from 'cookie'

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || JSON.stringify({ user: null }));

	// code here happends before the endpoint or page is called
	event.locals.user = cookies.user

	const response = await resolve(event)

	// code here happens after the endpoint or page is called
	response.headers.set('set-cookie', `user=${event.locals.user || ''}; Path=/; HttpOnly`)

	return response
}

export async function getSession({ locals }) {
	return {
		user: locals.user,
	}
}
