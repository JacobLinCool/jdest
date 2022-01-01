import path from "path";
import { platform } from "process";
import { homedir } from "os";
import { execSync } from "child_process";
import { existsSync, appendFileSync } from "fs";
import chalk from "chalk";
import { Command } from "commander";
import { log, command_exists, app_exists, confirm } from "../../utils";

async function mac_install(program: Command, fast: boolean): Promise<void> {
    // Install NVM
    if (!existsSync(path.resolve(homedir(), ".nvm", "nvm.sh"))) {
        if (fast || (await confirm("Install NVM?"))) {
            log("Installing NVM...");
            execSync("curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash", { stdio: "inherit" });
            log(chalk.cyanBright("NVM installed!"));
        } else {
            log(chalk.yellowBright("Skipping NVM installation..."));
        }
    } else {
        log(chalk.cyanBright("NVM already installed!"));
    }

    // Install Latest LTS Node
    if (!command_exists("node")) {
        if (fast || (await confirm("Install Latest LTS Node?"))) {
            log("Installing Latest LTS Node...");
            execSync("nvm install --lts", { stdio: "inherit" });
            log(chalk.cyanBright("Latest LTS Node installed!"));
        } else {
            log(chalk.yellowBright("Skipping Latest LTS Node installation..."));
        }
    } else {
        log(chalk.cyanBright("Node already installed!"));
    }

    // Install PNpM
    if (!command_exists("pnpm")) {
        if (fast || (await confirm("Install PNpM?"))) {
            log("Installing PNpM...");
            execSync("npm install -g pnpm", { stdio: "inherit" });
            log(chalk.cyanBright("PNpM installed!"));
        } else {
            log(chalk.yellowBright("Skipping PNpM installation..."));
        }
    } else {
        log(chalk.cyanBright("PNpM already installed!"));
    }

    // Install Yarn
    if (!command_exists("yarn")) {
        if (fast || (await confirm("Install Yarn?"))) {
            log("Installing Yarn...");
            execSync("npm install -g yarn", { stdio: "inherit" });
            log(chalk.cyanBright("Yarn installed!"));
        } else {
            log(chalk.yellowBright("Skipping Yarn installation..."));
        }
    } else {
        log(chalk.cyanBright("Yarn already installed!"));
    }

    log(chalk.greenBright("All installations are done. Setup complete!"));
}

export async function action(program: Command): Promise<void> {
    const fast = program.opts().yes;

    log(chalk.blueBright("Installing Node development tools..."));

    if (fast) {
        log(chalk.yellowBright("Fast mode enabled. Confirmations will be skipped."));
    }

    if (platform === "win32") {
        log(chalk.greenBright("OS: Windows"));
    } else if (platform === "darwin") {
        log(chalk.greenBright("OS: MacOS"));
        await mac_install(program, fast);
    } else {
        log(chalk.redBright("Not Supported OS: " + platform));
    }
}
