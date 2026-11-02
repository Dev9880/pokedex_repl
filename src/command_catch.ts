import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name");
    }

    const pokemon: Pokemon = await state.pokeapi.fetchPokemon(args[0]);

    console.log(`Throwing a Pokeball at ${args[0]}...`);

    const catchingScore = Math.floor(Math.random() * pokemon.base_experience) + 1;
    if (catchingScore <= pokemon.base_experience / 2) {
        console.log(`${args[0]} escaped!`)
    } else {
        console.log(`${args[0]} was caught!`);
        state.pokedex[args[0]] = pokemon;
        console.log(`You may now inspect it with the inspect command.`);
    }
}