import type { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!\nUsage:\n");

    for (const [name, command] of Object.entries(state.commands)) {
        console.log(`${name}: ${command.description}`);
    }
}