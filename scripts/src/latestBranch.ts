import { URLs } from "../enums/URLs.ts";

/**
 * Fetch latest version of Minecraft from MinecraftForge/MinecraftForge's default branch on GitHub.
 * @throws Error When fetch fails
 * @returns string Latest version
 * @author dubfib
*/
export default async function latestBranch(): Promise<string> {
    const api = await fetch(URLs.latestVersion);

    if (!api.ok) throw new Error(`Failed to fetch. Status code: ${api.statusText}.`);
    const res = await api.json();

    return res['default_branch'];
}