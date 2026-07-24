//note: if your on windows, change from: / to \\ in the paths

import path from "node:path";

import latestBranch from "./src/latestBranch.ts";
import forgeSPI from "./src/forgeSPI.ts";
import forgeGradle from "./src/forgeGradle.ts";
import gradleWrapper from "./src/gradleWrapper.ts";
import gradleScripts from "./src/gradleScripts.ts";
import gradleProperties from "./src/gradleProperties.ts";
import releaseExists from "./src/releaseExists.ts";

(async () => {
    const root = path.join(__dirname, '..');

    const branch = await latestBranch();
    const { JAVA_VERSION, MC_VERSION, MCP_VERSION, MAPPING_CHANNEL, MAPPING_VERSION } = await gradleProperties(branch);

    //if (await releaseExists(`${MC_VERSION}-${MCP_VERSION}`)) {
        const FORGE_GRADLE = await forgeGradle();
        const SPI_VERSION = await forgeSPI();

        await gradleWrapper(path.join(root, 'gradle/wrapper'), branch);
        await gradleScripts(root, branch);

        const build_gradle_path = path.join(root, 'scripts/templates/build.gradle');
        const build_gradle_template = await Bun.file(build_gradle_path).text();

        const build_gradle = build_gradle_template
            .replace('FORGE_GRADLE', String(FORGE_GRADLE ?? 6))
            .replace('JAVA_VERSION', String(JAVA_VERSION))
            .replace('MINECRAFT_VERSION', String(MC_VERSION))
            .replace('MCP_VERSION', String(MCP_VERSION))
            .replace('MAPPINGS_CHANNEL', String(MAPPING_CHANNEL))
            .replace('MAPPINGS_VERSION', String(MAPPING_VERSION))
            .replace('SPI_VERSION', String(SPI_VERSION))

        await Bun.write(path.join(root, 'build.gradle'), build_gradle);

        const readme_path = path.join(root, 'scripts/templates/README.md');
        const readme_template = await Bun.file(readme_path).text();

        const readme = readme_template
            .replace('JAVA_VERSION', String(JAVA_VERSION))
            .replace('MINECRAFT_VERSION', String(MC_VERSION))
            .replace('MCP_VERSION', String(MCP_VERSION));

        await Bun.write(path.join(root, 'README.md'), readme);

        console.log(`${MC_VERSION}-${MCP_VERSION}`);
    //}
})();
