import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";

import type { CLICommand } from "./state.js";
import { ShallowLocations } from "./pokeapi.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },

    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },

    map: {
      name: "map",
      description: "It displays the names of 20 location areas in the Pokemon world",
      callback: async (state) => { 
          const locations: ShallowLocations = 
            await state.pokeapi.fetchLocations(state.nextLocationsURL);

          state.prevLocationsURL = locations.previous;
          state.nextLocationsURL = locations.next;

          for (const location of locations.results) {
            console.log(`${location.name}`);
          }
      }
    },

    mapb: {
      name: "mapb",
      description: "It displays the previous 20 locations. It's a way to go back",
      callback: async (state) => { 
          if (!state.prevLocationsURL) {
            throw new Error("you're on the first page");
          }
          
          const locations: ShallowLocations = 
            await state.pokeapi.fetchLocations(state.prevLocationsURL);

          for (const location of locations.results) {
            console.log(`${location.name}`);
          }
      }
    },

    explore: {
      name: "explore <location_area>",
      description: "It takes the name of a location area and diplays the pokemon in that area",
      callback: commandExplore
    },

    catch: {
      name: "catch <pokemon>",
      description: "It catches a pokemon",
      callback: commandCatch
    },

    inspect: {
      name: "inspect <pokemon>",
      description: "It takes the name of a Pokemon and prints the details of the Pokemon.",
      callback: commandInspect
    },

    pokedex: {
      name: "pokedex",
      description: "Displays your pokemons.",
      callback: commandPokedex
    }

  };
}