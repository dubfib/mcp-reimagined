import { URLs } from "../enums/URLs.ts";
import latestVersion from "./latestVersion.ts";
import convertVersion from "./convertVersion.ts";

/**
 * Fetches and parses gradle.properties file in Forge repository (Latest Version)
 * @throws Error When fetch fails
 * @returns Object of entries
 * @author dubfib
*/
export default async function gradleProperties() {
    const version = await latestVersion();
    const branch = convertVersion(version);

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