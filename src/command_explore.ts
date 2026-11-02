import { State } from "./state.js";
import { Location } from "./pokeapi.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }
    
    console.log(`Exploring ${args[0]}...`);
    const location: Location = await state.pokeapi.fetchLocation(args[0]);

    console.log(`Found Pokemon:`)
    for (const poke of location.pokemon_encounters) {
    console.log(`${poke.pokemon.name}`);
    }
}