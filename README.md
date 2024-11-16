# mcp-reimagined
> Automated fork of **[Hexeption/MCP-Reborn](https://github.com/Hexeption/MCP-Reborn)** powered by **[GitHub Actions](https://github.com/features/actions)** and **[Bun](https://bun.sh)**.

> [!CAUTION]
> You are **NOT** allowed to publish any of **[Minecraft](https://minecraft.net)**'s code generated by this tool. **Refer** to the **[License](https://github.com/dubfib/mcp-reimagined/blob/main/MCP-License)** for **more** information.

> [!IMPORTANT]
> This **repository automatically updates** **build.gradle** to the **latest version** of **[Minecraft](https://minecraft.net)**.

> [!WARNING]
> This repository **requires [Java](https://oracle.com/java)** version **21** or higher.

> [!NOTE]  
> The **current [Minecraft](https://minecraft.net) verison** in this **repository** is **1.21.3**.

## Usage
> [!IMPORTANT]
> **[IntelliJ IDEA](https://www.jetbrains.com/idea/download)** is **recommended** for this project.

### Downloading using **[Git](https://git-scm.com)**
```
git clone https://github.com/dubfib/mcp-reimagined.git
```
*Or **download** from your **browser** **[here](https://codeload.github.com/dubfib/mcp-reimagined/zip/refs/heads/main)**.*

### Unzip or open the project in IntelliJ IDEA
> [!TIP]
> You can **optionally delete** the **.github** and **scripts folder** as it is **used for automation in the repository**.

### Select **build.gradle** and click the [run button](https://jetbrains.com/help/idea/running-applications.html) at the top right corner of **IntelliJ IDEA**
> [!TIP]
> You can **edit how much ram** **[Gradle](https://gradle.org)** can use in **gradle.properties** to **speed up the process**.
> ```bash
> # Sets default memory used for gradle commands. Can be overridden by user or command line properties.
> # This is required to provide enough memory for the Minecraft decompilation process.
> org.gradle.jvmargs=-Xmx4G # 4GB of ram instead of the default 6GB.
> org.gradle.daemon=true
> org.gradle.parallel=true
> org.gradle.configureondemand=true
> ```

### Click the **[Gradle](https://gradle.org)** icon on the [right sidebar](https://jetbrains.com/help/idea/work-with-gradle-tasks.html).
> [!IMPORTANT]
> **Run Tasks/mcp/setup** and then after **Tasks/mcp/copyAssets**.

### Run Minecraft client
> [!NOTE]
> **Click** the **[dropdown next to the run button](https://jetbrains.com/help/idea/work-with-gradle-tasks.html)**, then **select Minecraft then click run**. Or your can run **[Tasks/mcp/runClient](https://jetbrains.com/help/idea/work-with-gradle-tasks.html)**.

## Building
> todo. docs will be added in the future.

## Contributors
* **[Hexeption](https://github.com/hexeption)**
* **[kingdevnl](https://github.com/kingdevnl)**
* **[dubfib](https://github.com/dubfib)**

❤️ **Special thanks** to the **[MinecraftForge](https://github.com/MinecraftForge)** for making **this project possible**.
