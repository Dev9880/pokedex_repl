import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export function initState(cacheInterval: number): State {
    const pokeapi = new PokeAPI(cacheInterval);
    const state: State = {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }),
        commands: getCommands(),
        pokeapi: pokeapi,
        nextLocationsURL: "",
        prevLocationsURL: ""
    }

    return state;
}