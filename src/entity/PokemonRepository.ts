import { injectable } from "inversify";
import { ExtendedPokemon, PokemonRepository } from "../types/types";

@injectable()
class PokemonRepositoryImpl implements PokemonRepository {
  async getPokemon(id: number): Promise<ExtendedPokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const pokemon: ExtendedPokemon = {
      name: data.name,
      imageUrl: data.sprites.front_default,
      types: data.types.map((type: any) => type.type.name),
      height: data.height,
      abilities: data.abilities.map((ability: any) => ability.ability.name),
      generations: Object.keys(data.sprites.versions),
      selectedGeneration: "",
      selectedDepth: "",
      sprites: data.sprites,
    };
    console.log("get", pokemon);
    return pokemon;
  }
}

export default PokemonRepositoryImpl;
