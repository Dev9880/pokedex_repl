import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name");
    }

    const pokemonName = args[0];

    if (pokemonName in state.pokedex) {
        const pokemon: Pokemon = state.pokedex[pokemonName];
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);

        console.log(`Stats:`);
        for (const statInfo of pokemon.stats) {
            console.log(`  -${statInfo.stat.name}: ${statInfo.base_stat}`);
        }

        console.log(`Types:`);
        for (const typeInfo of pokemon.types) {
            console.log(` -${typeInfo.type.name}`);
        }

    } else {
        console.log("you have not caught that pokemon");
    }
}