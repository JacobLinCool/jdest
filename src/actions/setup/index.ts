import path from "path";
import { platform } from "process";
import { homedir } from "os";
import { execSync } from "child_process";
import { existsSync, appendFileSync } from "fs";
import chalk from "chalk";
import { Command } from "commander";
import { log, command_exists, app_exists, confirm } from "../../utils";

async function mac_install(program: Command, fast: boolean): Promise<void> {
    // Install Brew
    if (!command_exists("brew")) {
        if (fast || (await confirm("Install Homebrew?"))) {
            log(chalk.cyanBright("Installing Homebrew..."));
            execSync(`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`, { stdio: "inherit" });
            log(chalk.cyanBright("Homebrew reinstalled!"));
        } else {
            log(chalk.yellowBright("Skipping brew reinstallation..."));
        }
    } else {
        log(chalk.cyanBright("Brew already installed!"));
    }

    // Install Google Chrome
    if (!app_exists("Google Chrome")) {
        if (fast || (await confirm("Install Google Chrome?"))) {
            log(chalk.cyanBright("Installing Google Chrome..."));
            execSync(`brew install --cask google-chrome`, { stdio: "inherit" });
            log(chalk.cyanBright("Google Chrome installed!"));
        } else {
            log(chalk.yellowBright("Skipping Google Chrome installation..."));
        }
    } else {
        log(chalk.cyanBright("Google Chrome already installed!"));
    }

    // Install iTerm2
    if (!app_exists("iTerm")) {
        if (fast || (await confirm("Install iTerm2?"))) {
            log(chalk.cyanBright("Installing iTerm2..."));
            execSync(`brew reinstall iterm2`, { stdio: "inherit" });
            log(chalk.cyanBright("iTerm2 installed!"));
        } else {
            log(chalk.yellowBright("Skipping iTerm2 installation..."));
        }
    } else {
        log(chalk.cyanBright("iTerm2 already installed!"));
    }

    // Install ZSH
    if (!command_exists("zsh")) {
        if (fast || (await confirm("Install ZSH?"))) {
            log(chalk.cyanBright("Installing ZSH..."));
            execSync(`brew reinstall zsh`, { stdio: "inherit" });
            log(chalk.cyanBright("ZSH installed!"));
        } else {
            log(chalk.yellowBright("Skipping ZSH installation..."));
        }
    } else {
        log(chalk.cyanBright("ZSH already installed!"));
    }

    // Install ZIM:FW
    if (!existsSync(path.resolve(homedir(), ".zim", "zimfw.zsh"))) {
        if (fast || (await confirm("Install ZIM:FW?"))) {
            log(chalk.cyanBright("Installing ZIM:FW..."));
            execSync(`curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh`, { stdio: "inherit" });
            appendFileSync(path.resolve(homedir(), ".zshrc"), `\n\n# Archive\nzmodule archive\n`);
            log(chalk.cyanBright("ZIM:FW installed!"));
        } else {
            log(chalk.yellowBright("Skipping ZIM:FW installation..."));
        }
    } else {
        log(chalk.cyanBright("ZIM:FW already installed!"));
    }

    // Install Powerlevel10k
    if (!existsSync(path.resolve(homedir(), ".zim", "modules", "powerlevel10k"))) {
        if (fast || (await confirm("Install Powerlevel10k?"))) {
            log(chalk.cyanBright("Installing Powerlevel10k..."));
            appendFileSync("~/.zimrc", `\n\n# Powerlevel10k\nzmodule romkatv/powerlevel10k --use degit\n`);
            execSync(`zimfw install`, { stdio: "inherit" });
            log(chalk.cyanBright("Powerlevel10k installed!"));
        } else {
            log(chalk.yellowBright("Skipping Powerlevel10k installation..."));
        }
    } else {
        log(chalk.cyanBright("Powerlevel10k already installed!"));
    }

    // Install VS Code
    if (!app_exists("Visual Studio Code")) {
        if (fast || (await confirm("Install VS Code?"))) {
            log(chalk.cyanBright("Installing VS Code..."));
            execSync(`brew reinstall --cask visual-studio-code`, { stdio: "inherit" });
            log(chalk.cyanBright("VS Code installed!"));
        } else {
            log(chalk.yellowBright("Skipping VS Code installation..."));
        }
    } else {
        log(chalk.cyanBright("VS Code already installed!"));
    }

    // Install KeyCastr
    if (!app_exists("KeyCastr")) {
        if (fast || (await confirm("Install KeyCastr?"))) {
            log(chalk.cyanBright("Installing KeyCastr..."));
            execSync(`brew reinstall --cask keycastr`, { stdio: "inherit" });
            log(chalk.cyanBright("KeyCastr installed!"));
        } else {
            log(chalk.yellowBright("Skipping KeyCastr installation..."));
        }
    } else {
        log(chalk.cyanBright("KeyCastr already installed!"));
    }

    // Install GitHub Desktop
    if (!app_exists("GitHub Desktop")) {
        if (fast || (await confirm("Install GitHub Desktop?"))) {
            log(chalk.cyanBright("Installing GitHub Desktop..."));
            execSync(`brew reinstall --cask github`, { stdio: "inherit" });
            log(chalk.cyanBright("GitHub Desktop installed!"));
        } else {
            log(chalk.yellowBright("Skipping GitHub Desktop installation..."));
        }
    } else {
        log(chalk.cyanBright("GitHub Desktop already installed!"));
    }

    // Install Docker
    if (!command_exists("docker")) {
        if (fast || (await confirm("Install Docker?"))) {
            log(chalk.cyanBright("Installing Docker..."));
            execSync(`brew reinstall docker`, { stdio: "inherit" });
            log(chalk.cyanBright("Docker installed!"));
        } else {
            log(chalk.yellowBright("Skipping Docker installation..."));
        }
    } else {
        log(chalk.cyanBright("Docker already installed!"));
    }

    log(chalk.greenBright("All installations are done. Setup complete!"));
}

async function win_install(program: Command, fast: boolean): Promise<void> {
    // Install Chocolatey
    if (!command_exists("choco")) {
        if (fast || (await confirm("Install Chocolatey?"))) {
            log(chalk.cyanBright("Installing Chocolatey..."));
            execSync(
                `runas /user:Administrator cmd /c "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"`,
                { stdio: "inherit" },
            );
            log(chalk.cyanBright("Chocolatey installed!"));
        } else {
            log(chalk.yellowBright("Skipping Chocolatey installation..."));
        }
    }

    // Install Google Chrome
    if (
        !existsSync(path.resolve("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe")) &&
        !existsSync(path.resolve("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"))
    ) {
        if (fast || (await confirm("Install Google Chrome?"))) {
            log(chalk.cyanBright("Installing Google Chrome..."));
            execSync(`choco install googlechrome`, { stdio: "inherit" });
            log(chalk.cyanBright("Google Chrome installed!"));
        } else {
            log(chalk.yellowBright("Skipping Google Chrome installation..."));
        }
    }

    // Install Tabby

    // Install MinGW

    // Install VSCode

    // Install KeyCastOW

    // Install GitHub Desktop

    // Install Docker
}

export async function action(program: Command): Promise<void> {
    const fast = program.opts().yes;

    log(chalk.blueBright("Installing basic development tools..."));

    if (fast) {
        log(chalk.yellowBright("Fast mode enabled. Confirmations will be skipped."));
    }

    if (platform === "win32") {
        log(chalk.greenBright("OS: Windows"));
        await win_install(program, fast);
    } else if (platform === "darwin") {
        log(chalk.greenBright("OS: MacOS"));
        await mac_install(program, fast);
    } else {
        log(chalk.redBright("Not Supported OS: " + platform));
    }
}
