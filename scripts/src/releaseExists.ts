import { URLs } from "../enums/URLs.ts";

/**
 * Check if release already exists in the GitHub repository
 * @throws Error When fetch fails
 * @returns string Latest version
 * @author dubfib
 */
export default async function releaseExists(version: string): Promise<boolean> {
    const api = await fetch(URLs.githubReleases);

    if (!api.ok) throw new Error(`Failed to fetch. Status code: ${api.statusText}.`);
    const res = await api.json();

    return res[0]['name'] === version;
}
