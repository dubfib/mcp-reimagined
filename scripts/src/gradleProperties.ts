import { URLs } from "../enums/URLs.ts";
import latestBranch from "./latestBranch.ts";

/**
 * Fetches and parses gradle.properties file in Forge repository (Latest Version)
 * @throws Error When fetch fails
 * @param branch Branch to download from MinecraftForge/MinecraftForge on GitHub
 * @returns Object of entries
 * @author dubfib
*/
export default async function gradleProperties(branch: string): Promise<Record<string, string>> {
    const web = await fetch(URLs.gradleProperties.replace('VERSION', branch));

    if (!web.ok) throw new Error(`Failed to fetch. Status code: ${web.statusText}.`);
    const text = await web.text();

    return Object.fromEntries(
        text.split('\n')
            .map(line => line.split('//')[0].trim())
            .filter(line => line && !line.startsWith('#'))
            .map(line => line.match(/^([\w.-]+)=([\s\S]+)/))
            .filter((match): match is RegExpMatchArray => match !== null)
            .map(match => [match[1], match[2].trim()])
    );
};