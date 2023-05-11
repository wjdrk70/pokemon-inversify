interface PokemonAbilitiesProps {
  abilities: string[];
}

const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({ abilities }) => {
  return (
    <div>
      <h2>Abilities:</h2>
      <ul>
        {abilities.map((ability) => (
          <li key={ability}>{ability}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonAbilities;
