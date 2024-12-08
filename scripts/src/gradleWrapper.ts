import { URLs } from "../enums/URLs.ts";
import downloadFile from './downloadFile.ts';

/**
 * Downloads gradle/wrapper directory from latest branch in Forge repository on GitHub
 * @param dest Folder directory where gradle/wrapper contents will be downloaded to
 * @param branch Branch to download from MinecraftForge/MinecraftForge on GitHub
 * @returns null
 * @author dubfib
 */
export default async function gradleWrapper(dest: string, branch: string): Promise<void> {
    await downloadFile(URLs.gradleWrapperJar.replace('VERSION', branch), `${dest}\\gradle-wrapper.jar`);
    await downloadFile(URLs.gradleWrapperProperties.replace('VERSION', branch), `${dest}\\gradle-wrapper.properties`);
}