import { URLs } from "../enums/URLs.ts";

/**
 * Fetches ForgeSPI version from Forge's website by HTML parsing
 * @throws Error When fetch fails
 * @returns Forge SPI version (ex: 7.1.5)
 * @author dubfib
 */
export default async function forgeSPI() {
    const web = await fetch(URLs.forgeSPI);
    if (!web.ok) throw new Error(`Failed to fetch. Status code: ${web.statusText}.`);

    const res = await web.text();
    return res.match(/<small>(.*?)<\/small>/)?.[1];
}