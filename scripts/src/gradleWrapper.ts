import { URLs } from "../enums/URLs.ts";
import convertVersion from './convertVersion.ts'
import latestVersion from "./latestVersion.ts";
import downloadFile from './downloadFile.ts';

/**
 * Downloads gradle/wrapper directory from latest branch in Forge repository on GitHub
 * @param dest Folder directory where gradle/wrapper contents will be downloaded to
 * @returns null
 * @author dubfib
 */
export default async function gradleWrapper(dest: string) {
    const version = await latestVersion();
    const branch = convertVersion(version);

    await downloadFile(URLs.gradleWrapperJar.replace('VERSION', branch), `${dest}/gradle-wrapper.jar`);
    await downloadFile(URLs.gradleWrapperProperties.replace('VERSION', branch), `${dest}/gradle-wrapper.properties`);
}

