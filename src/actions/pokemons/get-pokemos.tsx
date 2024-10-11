import { pokeApi } from "../../config/api/pokeApi";  // Importa la instancia configurada de Axios para hacer peticiones a la API de Pokémon.
import type { Pokemon } from "../../domain/entities/pokemon";  // Importa el tipo "Pokemon" que define la estructura de los objetos Pokémon.
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeApi.interfaces";  // Importa las interfaces que definen la estructura de los datos de la API.
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";  // Importa el mapper que transformará los datos de la API a la estructura de tu dominio.

export const getPokemon = async (page: number, limit: number = 20): Promise<Pokemon[]> => {
  // Función asíncrona para obtener una lista de Pokémon. Recibe un número de página y un límite de resultados por página.
  try {
    // 1. Construcción de la URL para la paginación. 'offset' determina el inicio de los resultados, y 'limit' cuántos traer.
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    
    // 2. Realiza una petición GET a la API de Pokémon usando la URL generada. Se espera que la respuesta coincida con la interfaz `PokeAPIPaginatedResponse`.
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    // 3. `data.results` contiene un array con la información básica de los Pokémon (nombre y URL de cada Pokémon). 
    // Por cada Pokémon, haces una nueva petición a la API para obtener su información detallada.
    const pokemonPromises = data.results.map((info) => {
      // Cada petición individual usa la URL proporcionada en `info.url` para obtener la data de ese Pokémon.
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    // 4. `Promise.all` espera a que todas las peticiones individuales a los detalles de los Pokémon se resuelvan.
    const pokeApiPokemons = await Promise.all(pokemonPromises);

    // 5. Una vez que tienes todos los datos de los Pokémon, mapeas cada respuesta al formato de tu dominio usando el `PokemonMapper`.
    const pokemons = pokeApiPokemons.map((item) => PokemonMapper.pokeApiPokemonToEntity(item.data));

    console.log(pokemons[0]);  // Solo para depuración: Imprime el primer Pokémon mapeado.

    return pokemons;  // Retorna el array de Pokémon ya mapeados a la estructura que usas en tu aplicación.

  } catch (error) {
    // 6. Si algo falla en cualquier punto de la petición, captura el error y lanza uno nuevo con un mensaje personalizado.
    throw new Error('Error to get pokemons');
  }
};

