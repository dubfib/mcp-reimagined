/**
 * Download a file with a specified URL and path.
 * @throws Error When fetch fails
 * @param url URL to download the file from
 * @param dest Path where the file will be downloaded
 * @returns null
*/
export default async function downloadFile(url: string, dest: string): Promise<void> {
    const web = await fetch(url);

    if (!web.ok) throw new Error(`Failed to fetch file. Status code: ${web.statusText}`);
    const buffer = await web.arrayBuffer();

    await Bun.write(dest, buffer);
}