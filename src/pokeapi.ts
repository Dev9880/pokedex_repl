import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cachedData: Cache;

  constructor(cacheInterval: number) {
    this.cachedData = new Cache(cacheInterval);
  }

  closeCache() {
    this.cachedData.stopReapLoop();
  }


  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL || `${PokeAPI.baseURL}/location-area`;

    // check the cache for data 
    // If it's found return it
    const cache = this.cachedData.get<ShallowLocations>(fullURL);
    if (cache)
      return cache;

    try {

      const response = await fetch(fullURL, {
          method: "GET"
      })

      if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json() as ShallowLocations;

      // add the data in cache
      this.cachedData.add<ShallowLocations>(fullURL, data);

      return data;
    } catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cache = this.cachedData.get<Location>(url);
    if (cache)
      return cache;

    try {
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }

        const location: Location = await resp.json();

        // add the data in cache
        this.cachedData.add<Location>(url, location);

        return location;
    } catch (e) {
        throw new Error(
            `Error fetching location '${locationName}': ${(e as Error).message}`,
        );
    }
  }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string
    }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};