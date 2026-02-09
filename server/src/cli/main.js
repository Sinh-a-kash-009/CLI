#!/usr/bin/env node

import dotenv from "dotenv";
import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { login} from "./commands/auth/login.js";
dotenv.config();


async function main() {
    // Display banner
    console.log(chalk.green(figlet.textSync("CLI Server", { font: "Standard", horizontalLayout: "default" })));

    console.log(chalk.blue("Starting AI based CLI Server...\n"));

    const program = new Command("cli-server");
    program
        .version("1.0.0")
        .description("AI based CLI Server for executing commands and managing tasks.")
        .addCommand(login);
    program.action(() => {
        program.help();
    });
    program.parse();

}

main().catch((err) => {
    console.error(chalk.red("Error starting server:"), err);
    process.exit(1);
});

// cli-server name of the cli 