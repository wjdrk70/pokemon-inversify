interface PokemonImageProps {
  imageUrl: string;
  alt: string;
}

const PokemonImage: React.FC<PokemonImageProps> = ({ imageUrl, alt }) => {
  return imageUrl ? <img src={imageUrl} alt={alt} /> : null;
};

export default PokemonImage;
