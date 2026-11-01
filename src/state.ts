import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export function initState(): State {
    const state: State = {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }),
        commands: getCommands()
    }

    return state;
}