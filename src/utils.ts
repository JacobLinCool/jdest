import path from "path";
import { existsSync } from "fs";
import { platform } from "process";
import { createInterface } from "readline";
import chalk from "chalk";
import { sync as cmd_ext } from "command-exists";

export function log(...msgs: unknown[]): void {
    console.log(chalk.magentaBright("[jdest]"), ...msgs);
}

export function command_exists(command: string): boolean {
    return cmd_ext(command);
}

export function app_exists(app: string): boolean {
    if (platform === "win32") {
        return false;
    } else if (platform === "darwin") {
        try {
            return existsSync(path.resolve("/", "Applications", app + ".app"));
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
}

export function confirm(question: string): Promise<boolean> {
    return new Promise((resolve) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(question + " (y/n) ", (answer) => {
            rl.close();
            resolve(answer.trim().toLowerCase() === "y");
        });
    });
}
