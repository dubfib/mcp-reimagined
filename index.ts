import * as fs from 'node:fs';

const convertVersion = (str: string): string => str.replace(/^(\d+\.\d+)\.\d+$/, '$1.x');

const latestVersion = async () => (await (await fetch('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json')).json())['latest']['release'];
const forgeGradle = async () => (await (await fetch('https://api.github.com/repos/MinecraftForge/ForgeGradle')).json()).default_branch.match(/^FG_(\d+\.\d+)$/)?.[1];

const gradleWrapper = async (convertedVersion: string, directory: string) => {
    // @ts-ignore
    // maybe wiil fix in the future, typescript is being annoying about this
    const download = async (u, p) => await (await fetch(u)).arrayBuffer().then(buf => fs.writeFileSync(p, Buffer.from(buf)));

    await download(`https://github.com/MinecraftForge/MinecraftForge/raw/refs/heads/${convertedVersion}/gradle/wrapper/gradle-wrapper.jar`, `${directory}/gradle-wrapper.jar`);
    await download(`https://raw.githubusercontent.com/MinecraftForge/MinecraftForge/refs/heads/${convertedVersion}/gradle/wrapper/gradle-wrapper.properties`, `${directory}/gradle-wrapper.properties`);
}

// @ts-ignore
// maybe wiil fix in the future, typescript is being annoying about this
const parseProperties = (input: string) => Object.fromEntries(input.split('\n').map(_ => _.split('//')[0].trim()).filter(_ => _ && !_.startsWith('#')).map(_ => _.match(/^([\w.-]+)=([\s\S]+)/)).filter(Boolean).map(m => [m[1], m[2].trim()]));

// @ts-ignore
// maybe wiil fix in the future, typescript is being annoying about this
const gradleProperties = async (convertedVersion: string) => parseProperties(await (await fetch(`https://raw.githubusercontent.com/MinecraftForge/MinecraftForge/refs/heads/${convertedVersion}/gradle.properties`)).text());

const forgeSpi = async () => (await (await fetch('https://files.minecraftforge.net/net/minecraftforge/forgespi/index.html')).text()).match(/<small>(.*?)<\/small>/)?.[1];

const build_gradle = `buildscript {
    repositories {
        mavenLocal()
        maven { url = 'https://maven.minecraftforge.net' }
        mavenCentral()
        gradlePluginPortal()
    }
    dependencies {
        classpath 'net.minecraftforge.gradle:ForgeGradle:FORGE_GRADLE+'
        classpath "gradle.plugin.org.jetbrains.gradle.plugin.idea-ext:gradle-idea-ext:1.1.3"
    }
}

import net.minecraftforge.gradle.common.util.Utils
import net.minecraftforge.gradle.common.util.VersionJson
import org.jetbrains.gradle.ext.*

apply plugin: 'eclipse'
apply plugin: 'net.minecraftforge.gradle.patcher'
apply plugin: "org.jetbrains.gradle.plugin.idea-ext"

println(' Java: ' + System.getProperty('java.version') +
        ' JVM: ' + System.getProperty('java.vm.version') + '(' + System.getProperty('java.vendor') + ')' +
        ' Arch: ' + System.getProperty('os.arch'))

java.toolchain.languageVersion = JavaLanguageVersion.of(JAVA_VERSION)

configurations {
    shade
    compile.extendsFrom shade
}

group = 'me.yourname'
version = '1.0.0'

ext {
    minecraft_version = MINECRAFT_VERSION
    mcp_version = MCP_VERSION
    mappings_channel = MAPPINGS_CHANNEL
    mappings_version = MAPPINGS_VERSION
    spi_version = SPI_VERSION
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'net.minecraftforge:forgespi:' + spi_version
//    Use the shade to add the lib to the jar
//    or use compile if you want to load the lib from the version.json
//    from a maven repo
//    shade 'package-here'
//    compile 'package-here'
}

project(':mcp') {
    apply plugin: 'net.minecraftforge.gradle.mcp'
    mcp {
        config = minecraft_version + '-' + mcp_version
        pipeline = 'joined'
    }
}

evaluationDependsOn(':mcp')

patcher {
    parent = project(':mcp')
    patchedSrc = file('src/main/java')
    mappings channel: mappings_channel, version: mappings_version
    mcVersion = minecraft_version
}

jar {
    configurations.shade.each { dep ->
        from(project.zipTree(dep)) {
            exclude 'META-INF', 'META-INF/**'
        }
    }
}

var assetsFolder = file('run/assets')

tasks.register('runclient', JavaExec) {
    group = "MCP"
    description = "Runs the client"
    classpath sourceSets.main.runtimeClasspath
    if (System.getProperty("os.name").toLowerCase().contains("mac")) {
        jvmArgs '-XstartOnFirstThread'
    }

    var runFolder = file('run')
    var versionJson = Utils.loadJson(downloadAssets.getMeta().get().getAsFile(), VersionJson.class)

    workingDir runFolder
    args '--gameDir', '.'
    args '--version', minecraft_version
    args '--assetsDir', runFolder.relativePath(assetsFolder)
    args '--assetIndex', versionJson.assetIndex.id
    args '--accessToken', '0'
    main 'net.minecraft.client.main.Main'
}


tasks.register('setup') {
    group = "MCP"
    description = "Setups the dev workspace"
    dependsOn ':extractMapped'
    mkdir assetsFolder
    copy {
        from downloadAssets.output.path
        into assetsFolder
    }
}

tasks.register('copyAssets') {
    group = "MCP"
    description = "Download and place the assets into the run folder"
    dependsOn ':downloadAssets'
    mkdir 'run/assets'
    copy {
        from downloadAssets.output.path
        into assetsFolder
    }
}

tasks.register('runserver', JavaExec) {
    mkdir 'runserver'
    group = "MCP"
    description = "Runs the server"
    standardInput = System.in
    classpath sourceSets.main.runtimeClasspath
    main 'net.minecraft.server.Main'
    workingDir 'runserver'
}

idea.project.settings {
    runConfigurations {
        "Minecraft"(Application) {
            mainClass = 'mcp.client.Start'
            workingDirectory = "$projectDir/run"
            moduleName = idea.module.name + '.main'
        }
    }
}`;

(async () => {
    const latest = await latestVersion();
    const version = convertVersion(latest.toString());

    const FORGE_GRADLE = await forgeGradle();
    const SPI_VERSION = await forgeSpi();

    // @ts-ignore
    // i will probably fix this later
    const { JAVA_VERSION, MC_VERSION, MCP_VERSION, MAPPING_CHANNEL, MAPPING_VERSION } = await gradleProperties(conv);

    await gradleWrapper(version, './gradle/wrapper');

    const build_gradle_fixed = build_gradle.toString()
        .replace('FORGE_GRADLE', FORGE_GRADLE.toString())
        .replace('JAVA_VERSION', JAVA_VERSION)
        .replace('MINECRAFT_VERSION', `'${MC_VERSION}'`)
        .replace('MCP_VERSION', `'${MCP_VERSION}'`)
        .replace('MAPPING_CHANNEL', `'${MAPPING_CHANNEL}'`)
        .replace('MAPPING_VERSION', `'${MAPPING_VERSION}'`)
        .replace('SPI_VERSION', `'${SPI_VERSION}'`)

    await fs.promises.writeFile('./build.gradle', build_gradle_fixed);

    console.log('finished writing to build.gradle')
})();