import { useEffect, useState } from "react";
import { Container } from "inversify";
import { PokemonRepository, ExtendedPokemon } from "../types/types";
import PokemonRepositoryImpl from "../entity/PokemonRepository";

const container = new Container();
container
  .bind<PokemonRepository>("PokemonRepository")
  .to(PokemonRepositoryImpl)
  .inSingletonScope();

const usePokemonRepository = () => {
  const pokemonRepository =
    container.get<PokemonRepository>("PokemonRepository");
  const [pokemon, setPokemon] = useState<ExtendedPokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      const totalPokemonCount = data.count;
      const randomPokemonId = Math.floor(Math.random() * totalPokemonCount) + 1;
      const randomPokemon = await pokemonRepository.getPokemon(randomPokemonId);
      setPokemon(randomPokemon);
    };

    if (!pokemon) {
      fetchData();
    }
  }, [pokemon, pokemonRepository]);

  const handleGenerationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGeneration = e.target.value;
    setPokemon((prevPokemon: any) => ({
      ...prevPokemon!,
      selectedGeneration,
      selectedDepth: "",
    }));
  };

  const handleDepthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepth = e.target.value;
    setPokemon((prevPokemon: any) => ({
      ...prevPokemon!,
      selectedDepth,
    }));
  };

  const handleRandomPokemon = () => {
    setPokemon(null);
  };

  return {
    pokemon,
    handleGenerationChange,
    handleDepthChange,
    handleRandomPokemon,
  };
};

export default usePokemonRepository;
