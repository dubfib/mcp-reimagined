//note: if your on windows, change from: / to \\ in the paths

import path from "node:path";

import latestBranch from "./src/latestBranch.ts";
import forgeSPI from "./src/forgeSPI.ts";
import forgeGradle from "./src/forgeGradle.ts";
import gradleWrapper from "./src/gradleWrapper.ts";
import gradleScripts from "./src/gradleScripts.ts";
import minecraftVersions from "./src/minecraftVersions.ts";
import releaseExists from "./src/releaseExists.ts";

(async () => {
    const root = path.join(__dirname, '..');

    const branch = await latestBranch();
    const { java, minecraft, mcp } = await minecraftVersions(branch);

    const FORGE_GRADLE = await forgeGradle();
    const SPI_VERSION = await forgeSPI();

    await gradleWrapper(path.join(root, 'gradle/wrapper'), branch);
    await gradleScripts(root, branch);

    const build_gradle_path = path.join(root, 'scripts/templates/build.gradle');
    const build_gradle_template = await Bun.file(build_gradle_path).text();

    const build_gradle = build_gradle_template
    .replace('FORGE_GRADLE', String(FORGE_GRADLE ?? 6))
    .replace('JAVA_VERSION', String(java))
    .replace('MINECRAFT_VERSION', String(minecraft))
    .replace('MCP_VERSION', String(mcp))
    .replace('MAPPINGS_VERSION', String(minecraft))
    .replace('SPI_VERSION', String(SPI_VERSION))

    await Bun.write(path.join(root, 'build.gradle'), build_gradle);

    const readme_path = path.join(root, 'scripts/templates/README.md');
    const readme_template = await Bun.file(readme_path).text();

    const readme = readme_template
    .replace('JAVA_VERSION', String(java))
    .replace('MINECRAFT_VERSION', String(minecraft))
    .replace('MCP_VERSION', String(mcp));

    await Bun.write(path.join(root, 'README.md'), readme);

    console.log(`${minecraft}-${mcp}`);
})();
