interface Pokemon {
  name: string;
  imageUrl: string;
  types: string[];
  height: number;
}

interface ExtendedPokemon extends Pokemon {
  abilities: string[];
  generations: string[];
  selectedGeneration: string;
  selectedDepth: string;
  sprites?: {
    versions: {
      [key: string]: {
        [key: string]: {
          front_default: string | null;
        };
      };
    };
  };
}

interface PokemonRepository {
  getPokemon(id: number): Promise<ExtendedPokemon>;
}

export type { Pokemon, ExtendedPokemon, PokemonRepository };
