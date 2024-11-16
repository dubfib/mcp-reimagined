import { URLs } from "../enums/URLs.ts";
import convertVersion from './convertVersion.ts'
import latestVersion from "./latestVersion.ts";
import downloadFile from './downloadFile.ts';

/**
 * Downloads gradle scripts from latest branch in Forge repository on GitHub
 * @param dest Folder directory where gradle scripts will be downloaded to
 * @returns null
 * @author dubfib
 */
export default async function gradleScripts(dest: string) {
    const version = await latestVersion();
    const branch = convertVersion(version);

    await downloadFile(URLs.gradlewLinux.replace('VERSION', branch), `${dest}/gradlew`);
    await downloadFile(URLs.gradlewWindows.replace('VERSION', branch), `${dest}/gradlew.bat`);
}