import { URLs } from "../enums/URLs.ts";
import downloadFile from './downloadFile.ts';

/**
 * Downloads gradle scripts from latest branch in Forge repository on GitHub
 * @param dest Folder directory where gradle scripts will be downloaded to
 * @param branch Branch to download from MinecraftForge/MinecraftForge on GitHub
 * @returns null
 * @author dubfib
 */
export default async function gradleScripts(dest: string, branch: string): Promise<void> {
    await downloadFile(URLs.gradlewLinux.replace('VERSION', branch), `${dest}\\gradlew`);
    await downloadFile(URLs.gradlewWindows.replace('VERSION', branch), `${dest}\\gradlew.bat`);
}