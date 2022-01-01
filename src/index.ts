import { Command } from "commander";

const program = new Command();

// add command: setup
program.command("setup").action(async () => {
    return import("./actions/setup").then((module) => module.action(program));
});

// add command: node
program.command("node").action(async () => {
    return import("./actions/node").then((module) => module.action(program));
});

// add command: python
program.command("python").action(async () => {
    return import("./actions/python").then((module) => module.action(program));
});

// add option: --yes | -y
program.option("-y, --yes", "Skip Confirmations");

program.parse(process.argv);
