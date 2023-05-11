# inversify 를 활용한 의존성주입

##배포링크
https://pokemon-inversify.vercel.app/

## 의존성주입

inversifyJS 와 reflect-metadata 를
활용한 의존성 주입과 repository 패턴을
구현 해보았습니다.

## tsconfig

```json
    "lib": ["dom", "dom.iterable", "es6", "esnext"],
  "types": ["reflect-metadata", "node"],
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
```

reflect-metatadata 를 tsconfig 에 추가하여
데코레이터 속성을 활성화

PokemonRepository.ts

```typescript
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
```

getPokemon method 를 간단하게 만들고 ExtendedPokemon 으로
mapping 합니다.
`@injectable()` 데코레이터를
써서 repository를 주입합니다.

IoC 제어역전

```typescript
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
```

`inversify` 에서 가져온 새 `container` 를 인스턴스화
합니다. 그리고 고유 키 로 구현할때 바인딩 합니다.
인스턴스를 한번만 정의하거기 떄문에
`inSigletonScope()`를 사용

구현을 해보면서 nestJS 처럼 비슷하게 entity 구조와
injection 을 비슷하게 해보고 싶었지만,
점차 코드를 리팩토링하면서 고쳐가고싶습니다.
서비스가 크면 복잡하지만 유지보수 측면에서는 좋을거 같습니다.
