import { State } from "./state.js";

export async function startREPL(state: State) {
    
    state.rl.prompt();

    state.rl.on("line", async (line) => {
        const words: string[] = cleanInput(line);
        if (words.length === 0) {
            state.rl.prompt();
            return;
        }

        const commandName = words[0];
        const cmd = state.commands[commandName];
        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            state.rl.prompt();
            return;
        }
        
        try {
            await cmd.callback(state);
        } catch (e) {
            console.log((e as Error).message);
        }

        state.rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
//   const result: string[] = input.trim().split(/\s+/).map(str => {
//     return str.toLowerCase();
//   });

//   return result;

  return input.toLowerCase().trim().split(" ").filter((word) => word !== "");
  // the above will not work for 
  /**
   * {
        input: "  ",
        expected: [],
    },
   */
}


