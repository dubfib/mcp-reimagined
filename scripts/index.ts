import * as fs from 'node:fs';
import forgeSPI from "./src/forgeSPI.ts";
import forgeGradle from "./src/forgeGradle.ts";
import gradleWrapper from "./src/gradleWrapper.ts";
import gradleScripts from "./src/gradleScripts.ts";
import gradleProperties from "./src/gradleProperties.ts";

(async () => {
    const FORGE_GRADLE = await forgeGradle();
    const SPI_VERSION = await forgeSPI();

    const { JAVA_VERSION, MC_VERSION, MCP_VERSION, MAPPING_CHANNEL, MAPPING_VERSION } = await gradleProperties();

    await gradleWrapper('./gradle/wrapper');
    await gradleScripts('.');

    const build_gradle = (await fs.promises.readFile('./templates/build.gradle')).toString();

    const build_gradle_fixed = build_gradle.toString()
        .replace('FORGE_GRADLE', FORGE_GRADLE.toString())
        .replace('JAVA_VERSION', JAVA_VERSION)
        .replace('MINECRAFT_VERSION', `'${MC_VERSION}'`)
        .replace('MCP_VERSION', `'${MCP_VERSION}'`)
        .replace('MAPPINGS_CHANNEL', `'${MAPPING_CHANNEL}'`)
        .replace('MAPPINGS_VERSION', `'${MAPPING_VERSION}'`)
        .replace('SPI_VERSION', `'${SPI_VERSION}'`)

    await fs.promises.writeFile('../build.gradle', build_gradle_fixed);

    console.log('finished writing to build.gradle')
})();
