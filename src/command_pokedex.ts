import { Pokemon } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandPokedex(state: State) {
    console.log("Your Pokedex:")
    for (const key of Object.keys(state.pokedex)) {
        console.log(` - ${key}`);
    }
}