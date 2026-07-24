import { URLs } from "../enums/URLs.ts";
import latestBranch from "./latestBranch.ts";

/**
 * Fetches and parses gradle.properties file in Forge repository (Latest Version)
 * @throws Error When fetch fails
 * @param branch Branch to download from MinecraftForge/MinecraftForge on GitHub
 * @returns Object of entries
 * @author dubfib
 */
export default async function minecraftVersions(branch: string): Promise<Record<string, string>> {
    const web = await fetch(URLs.minecraftVersions.replace('VERSION', branch));

    if (!web.ok) throw new Error(`Failed to fetch. Status code: ${web.statusText}.`);
    const text = await web.text();

    const regex = /^\s*([\w.\-]+)\s*=\s*(["'])(.*?)\2/gm;

    return Object.fromEntries(
        text.matchAll(regex).map(match => [match[1], match[3]])
    );
};
