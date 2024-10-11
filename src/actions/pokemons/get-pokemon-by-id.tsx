import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";
import type { PokeAPIPokemon } from "../../infrastructure/interfaces/pokeApi.interfaces";

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    
    
    const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);

    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);

    return pokemon;

  } catch (error) {
    throw new Error(`Error en la petición: ${error}`);
  }
};
