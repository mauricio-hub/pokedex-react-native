import { Pokemon } from "../../domain/entities/pokemon";  // Importa el tipo "Pokemon" que define cómo debe ser la estructura de un Pokémon en tu dominio.
import { PokeAPIPokemon } from "../interfaces/pokeApi.interfaces";  // Importa la interfaz "PokeAPIPokemon" que define cómo vienen los datos de un Pokémon desde la API.

export class PokemonMapper {
/* 
  Un mapper es un patrón de diseño utilizado para transformar u "ordenar" datos entre dos estructuras
   diferentes. En el contexto de tu código, un mapper convierte los datos que vienen de una fuente externa, 
  como una API, en una forma que sea más fácil de usar o que se ajuste a la estructura interna de tu aplicación.
 */

    // Método estático que convierte un objeto "PokeAPIPokemon" (datos que llegan desde la API) a un objeto "Pokemon" (definido en tu dominio).
    static pokeApiPokemonToEntity(data: PokeAPIPokemon): Pokemon {
        
        // Llama a otro método del mapper para obtener un array de sprites (imágenes) del Pokémon.
        const sprites = PokemonMapper.getSprites(data);
        
        // Define la URL del avatar oficial del Pokémon usando su ID para construir la URL de la imagen.
        const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

        // Retorna un objeto con las propiedades del Pokémon en el formato que utiliza tu aplicación.
        return {
            id: data.id,  // ID del Pokémon.
            name: data.name,  // Nombre del Pokémon.
            avatar: avatar,  // URL de la imagen principal (avatar) del Pokémon.
            sprites: sprites,  // Array de sprites (otras imágenes del Pokémon).
            types: data.types.map((type) => type.type.name),  // Array con los tipos del Pokémon (agua, fuego, etc.).
        };
    }

    // Método estático que recibe los datos de un Pokémon y extrae los sprites (imágenes) en un array.
    static getSprites(data: PokeAPIPokemon): string[] {
        // Crea un array con los sprites principales: frontal y trasero (normal y shiny).
        const sprites: string[] = [
            data.sprites.front_default,  // Sprite frontal estándar.
            data.sprites.back_default,  // Sprite trasero estándar.
            data.sprites.front_shiny,  // Sprite frontal shiny (variocolor).
            data.sprites.back_shiny,  // Sprite trasero shiny.
        ];

        // Si existen otras versiones de los sprites (por ejemplo, del set "home" o "official-artwork"), se agregan al array.
        if (data.sprites.other?.home.front_default)
            sprites.push(data.sprites.other?.home.front_default);  // Sprite frontal de la versión "home".
        
        if (data.sprites.other?.['official-artwork'].front_default)
            sprites.push(data.sprites.other?.['official-artwork'].front_default);  // Sprite oficial frontal.
        
        if (data.sprites.other?.['official-artwork'].front_shiny)
            sprites.push(data.sprites.other?.['official-artwork'].front_shiny);  // Sprite oficial shiny frontal.
        
        if (data.sprites.other?.showdown.front_default)
            sprites.push(data.sprites.other?.showdown.front_default);  // Sprite frontal de la versión "showdown".
        
        if (data.sprites.other?.showdown.back_default)
            sprites.push(data.sprites.other?.showdown.back_default);  // Sprite trasero de la versión "showdown".

        // Retorna el array con todos los sprites encontrados.
        return sprites;
    }
}
