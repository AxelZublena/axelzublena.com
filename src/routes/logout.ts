export async function get(request) {
	request.locals.user = null
	console.log(request.locals.user)
	return {
		status: 302,
		headers: {
			location: '/'
		}
	}
}
