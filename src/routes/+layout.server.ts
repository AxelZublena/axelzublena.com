import type { LayoutServerLoad } from "./$types"
import { TELEMETRYDECK_ID } from "$env/static/private"

export const load: LayoutServerLoad = async (event) => {

    return {
        session: await event.locals.getSession(),
        segment: event.url.pathname,
        TELEMETRYDECK_ID
    }
}
