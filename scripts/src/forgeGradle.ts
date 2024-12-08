import { URLs } from "../enums/URLs.ts";

/**
 * Fetch the latest Forge Gradle version. Forge uses a naming scheme where their main branch is the latest Forge Gradle version. By executing a regex pattern, we can extract the exact version.
 * @throws Error When fetch fails
 * @returns Forge Gradle version (ex: 6) or null if not found
 * @author dubfib
*/
export default async function forgeGradle(): Promise<string | null> {
    const api = await fetch(URLs.forgeGradle);

    if (!api.ok) throw new Error(`Failed to fetch. Status code: ${api.statusText}.`);
    const res = await api.json();

    const match = res.default_branch.match(/^FG_(\d+\.\d+)$/);
    return match ? match[1] : null;
}