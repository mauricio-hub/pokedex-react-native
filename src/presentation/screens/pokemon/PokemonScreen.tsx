import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { RootStackParams } from "../../navigator/StackNavigatior";
import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "../../../actions/pokemons/get-pokemon-by-id";

interface Props extends StackScreenProps<RootStackParams, "PokemonScreen"> {}

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { pokemonId } = route.params;

  const { isLoading, data: pokemon } = useQuery({
    // 1. 'queryKey': Es la clave única que identifica esta consulta.
    // Aquí se usa un array ['pokemon', pokemonId]. 'pokemon' es la categoría
    // y 'pokemonId' es un valor dinámico que cambia dependiendo del Pokémon.
    queryKey: ["pokemon", pokemonId],
    // 2. 'queryFn': Es la función que se ejecuta para obtener los datos.
    //En este caso, `getPokemonById(pokemonId)` es una función que realiza
    //la consulta para obtener los detalles del Pokémon, usando su ID.
    queryFn: () => getPokemonById(pokemonId),
    // 3. 'staleTime': Especifica el tiempo durante el cual los datos se consideran
    //"frescos" y no necesitan recargarse. Aquí está configurado
    //en 1 hora (1000 milisegundos * 60 segundos * 60 minutos).
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View>
      <Text>{isLoading ? "Cargando..." : pokemon?.name}</Text>
    </View>
  );
};
