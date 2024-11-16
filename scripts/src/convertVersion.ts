/**
 * Convert version to major version (ex: 1.21.1 -> 1.21.x)
 * @param version Version to convert (ex: 1.21.1)
 * @returns Converted version (ex: 1.21.x)
 * @author dubfib
*/
export default function convertVersion(version: string) {
    return version.replace(/^(\d+\.\d+)\.\d+$/, '$1.x').toString();
}