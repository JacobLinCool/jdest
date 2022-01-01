import { platform } from "process";
import chalk from "chalk";
import { log } from "../../utils";
import { Command } from "commander";

export async function action(program: Command): Promise<void> {
    const fast = program.opts().yes;

    log(chalk.blueBright("Installing Python development tools..."));

    if (platform === "win32") {
        log(chalk.greenBright("OS: Windows"));
    } else if (platform === "darwin") {
        log(chalk.greenBright("OS: MacOS"));
    } else {
        log(chalk.redBright("Not Supported OS: " + platform));
    }
}
