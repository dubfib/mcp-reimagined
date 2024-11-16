import { URLs } from "../enums/URLs.ts";

/**
 * Fetch latest version of Minecraft from Mojang's Launcher API
 * @throws Error When fetch fails
 * @returns string Latest version
 * @author dubfib
*/
export default async function latestVersion() {
    const api = await fetch(URLs.pistonMojang);

    if (!api.ok) throw new Error(`Failed to fetch. Status code: ${api.statusText}.`);

    const res = await api.json();
    return res['latest']['release'].toString();
}