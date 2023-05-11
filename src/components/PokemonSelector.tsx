interface PokemonSelectorProps {
  generations: string[];
  selectedGeneration: string;
  selectedDepth: string;
  filteredDepths: string[];
  handleGenerationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDepthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PokemonSelector: React.FC<PokemonSelectorProps> = (props) => {
  const {
    generations,
    selectedGeneration,
    selectedDepth,
    filteredDepths,
    handleGenerationChange,
    handleDepthChange,
  } = props;

  return (
    <>
      <div>
        <label htmlFor="generation">Select Generation: </label>
        <select
          id="generation"
          value={selectedGeneration}
          onChange={handleGenerationChange}
        >
          <option value="">All Generations</option>
          {generations.map((generation) => (
            <option key={generation} value={generation}>
              {generation}
            </option>
          ))}
        </select>
      </div>
      {selectedGeneration && (
        <div>
          <label htmlFor="depth">Select Depth: </label>
          <select id="depth" value={selectedDepth} onChange={handleDepthChange}>
            <option value="">All Depths</option>
            {filteredDepths.map((depth) => (
              <option key={depth} value={depth}>
                {depth}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};
export default PokemonSelector;
