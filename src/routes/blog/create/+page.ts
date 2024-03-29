import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent()
	if (!session?.user) {
		redirect(302, "/");
	}
	if (session.user.name != "Axel Zublena") {
		redirect(302, "/");
	}
	return {}
}
