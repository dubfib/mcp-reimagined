import { URLs } from "../enums/URLs.ts";

/**
 * Check if release already exists in the GitHub repository
 * @throws Error When fetch fails
 * @returns string Latest version
 * @author dubfib
 */
export default async function releaseExists(version: string): Promise<boolean> {
    return false; // wip
}
