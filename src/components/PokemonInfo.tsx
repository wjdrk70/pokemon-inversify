// import React from "react";
// import usePokemonRepository from "../hooks/usePokemonRepository";

// const PokemonInfo: React.FC = () => {
//   const {
//     pokemon,
//     handleGenerationChange,
//     handleDepthChange,
//     handleRandomPokemon,
//   } = usePokemonRepository();

//   if (!pokemon) {
//     return <div>Loading...</div>;
//   }

//   const {
//     name,
//     imageUrl,
//     types,
//     height,
//     abilities,
//     generations,
//     selectedGeneration,
//     selectedDepth,
//     sprites,
//   } = pokemon;

//   const selectedImage =
//     selectedDepth &&
//     pokemon.sprites?.versions[selectedGeneration]?.[selectedDepth]
//       ?.front_default
//       ? pokemon.sprites?.versions[selectedGeneration]?.[selectedDepth]
//           ?.front_default
//       : imageUrl;

//   const filteredDepths = selectedGeneration
//     ? Object.keys(pokemon.sprites?.versions[selectedGeneration] || {}).filter(
//         (depth) =>
//           pokemon.sprites?.versions[selectedGeneration]?.[depth]
//             ?.front_default !== null
//       )
//     : [];

//   console.log("img", selectedImage);
//   console.log("pokemon", pokemon);

//   return (
//     <div>
//       <h1>{name}</h1>
//       {selectedImage && <img src={selectedImage} alt={name} />}
//       <p>Types: {types.join(", ")}</p>
//       <p>Height: {height}</p>
//       <div>
//         <label htmlFor="generation">Select Generation: </label>
//         <select
//           id="generation"
//           value={selectedGeneration}
//           onChange={handleGenerationChange}
//         >
//           <option value="">All Generations</option>
//           {generations.map((generation) => (
//             <option key={generation} value={generation}>
//               {generation}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedGeneration && (
//         <div>
//           <label htmlFor="depth">Select Depth: </label>
//           <select id="depth" value={selectedDepth} onChange={handleDepthChange}>
//             <option value="">All Depths</option>
//             {filteredDepths.map((depth) => (
//               <option key={depth} value={depth}>
//                 {depth}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//       <div>
//         <h2>Abilities:</h2>
//         <ul>
//           {abilities.map((ability) => (
//             <li key={ability}>{ability}</li>
//           ))}
//         </ul>
//       </div>
//       <button onClick={handleRandomPokemon}>Random Pokemon</button>
//     </div>
//   );
// };

// export default PokemonInfo;
import React from "react";
import usePokemonRepository from "../hooks/usePokemonRepository";
import PokemonSelector from "./PokemonSelector";
import PokemonImage from "./PokemonImage";
import PokemonAbilities from "./PokemonAbilities";

const PokemonInfo: React.FC = () => {
  const {
    pokemon,
    handleGenerationChange,
    handleDepthChange,
    handleRandomPokemon,
  } = usePokemonRepository();

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const {
    name,
    imageUrl,
    types,
    height,
    abilities,
    generations,
    selectedGeneration,
    selectedDepth,
    sprites,
  } = pokemon;

  const selectedImage =
    (selectedDepth &&
      sprites?.versions[selectedGeneration]?.[selectedDepth]?.front_default) ||
    imageUrl;

  const filteredDepths = selectedGeneration
    ? Object.keys(sprites?.versions[selectedGeneration] || {}).filter(
        (depth) =>
          sprites?.versions[selectedGeneration]?.[depth]?.front_default !== null
      )
    : [];

  console.log("img", selectedImage);
  console.log("pokemon", pokemon);

  return (
    <div>
      <h1>{name}</h1>
      <PokemonImage imageUrl={selectedImage} alt={name} />
      <p>Types: {types.join(", ")}</p>
      <p>Height: {height}</p>
      <PokemonSelector
        {...{
          generations,
          selectedGeneration,
          selectedDepth,
          filteredDepths,
          handleGenerationChange,
          handleDepthChange,
        }}
      />
      <PokemonAbilities abilities={abilities} />
      <button onClick={handleRandomPokemon}>Random Pokemon</button>
    </div>
  );
};

export default PokemonInfo;
