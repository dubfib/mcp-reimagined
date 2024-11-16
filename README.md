# mcp-reimagined
> Automated fork of **[Hexeption/MCP-Reborn](https://github.com/Hexeption/MCP-Reborn)** powered by **GitHub Actions** and **Bun** which **updates to the latest version** of **Minecraft**.

> [!CAUTION]
> You are **NOT** allowed to publish any of **Minecraft**'s code generated by this tool. **Refer** to the **[License](https://github.com/dubfib/mcp-reimagined/blob/main/MCP-License)** for **more** information.

> [!WARNING]
> This repository **requires Java** version **21** or higher.  
> Press **Ctrl + Shift + Alt + S** to change your **Java version** in **IntelliJ**.

> [!NOTE]
> The **current Minecraft version** in this **repository** is **1.21.3** `20241025.112443`.

## Usage
> [!IMPORTANT]
> **[IntelliJ IDEA](https://jetbrains.com/idea/download)** is **recommended** for this project.

### Clone repository with **Git**
```
$ git clone https://github.com/dubfib/mcp-reimagined.git
```
*Or **download** from your **browser** **[here](https://codeload.github.com/dubfib/mcp-reimagined/zip/refs/heads/main)**.*

### Unzip and open the project in IntelliJ IDEA
> [!TIP]
> You can **optionally delete** the **.github** and **scripts folder** as it is **used for automation in the repository**.

### Select **build.gradle** and click the run button at the top right corner
> [!TIP]
> You can **edit how much ram** **Gradle** can use in **gradle.properties** to **speed up the process**.
> ```bash
> # Sets default memory used for gradle commands. Can be overridden by user or command line properties.
> # This is required to provide enough memory for the Minecraft decompilation process.
> org.gradle.jvmargs=-Xmx8G # 8GB of ram instead of the default 6GB.
> org.gradle.daemon=true
> org.gradle.parallel=true
> org.gradle.configureondemand=true
> ```

### Click the Gradle icon on the right sidebar.
> [!IMPORTANT]
> **Run Tasks/mcp/setup**, then **Tasks/mcp/copyAssets**.

### Run Minecraft client
> [!NOTE]
> **Click** the **dropdown next to the run button**, **select Minecraft**, and **click run**, or just run **Tasks/mcp/runClient**.

## Building
> todo. docs will be added in the future.

## Contributors
* **[Hexeption](https://github.com/hexeption)**
* **[kingdevnl](https://github.com/kingdevnl)**
* **[dubfib](https://github.com/dubfib)**

❤️ **Special thanks** to the **[MinecraftForge](https://github.com/MinecraftForge)** for making **this project possible**.
