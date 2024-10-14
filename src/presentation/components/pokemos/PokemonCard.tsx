import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Pokemon } from "../../../domain/entities/pokemon";
import { Card, Text } from "react-native-paper";
import { FadeInImage } from "../ui/FadeInImage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigatior";

interface Props {
  pokemon: Pokemon; // Recibes un objeto de tipo Pokemon
}

export const PokemonCard = ({ pokemon }: Props) => {

  // useNavigation te permite obtener el objeto `navigation` para navegar entre pantallas
  // Especificas el tipo de las rutas que tienes en tu `RootStackParams` para mayor seguridad de tipos.
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    // Pressable es un componente que se puede presionar. Aquí estás diciendo que cuando lo presionen,
    // se navegue a la pantalla 'PokemonScreen', pasando el ID del Pokémon como parámetro.
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        // Aquí usas el método `navigate` para ir a la pantalla 'PokemonScreen'.
        // 'PokemonScreen' es una pantalla definida en tu sistema de navegación,
        // y le pasas el parámetro pokemonId con el ID del Pokémon seleccionado.
        navigation.navigate('PokemonScreen', { pokemonId: pokemon.id });
      }}
    >
      {/* Card es un contenedor estilizado, en este caso para mostrar los datos del Pokémon */}
      <Card style={styles.cardContainer}>
        {/* Muestras el nombre del Pokémon y su ID */}
        <Text style={styles.name} variant="bodyLarge" lineBreakMode="middle">
          {pokemon.name}
          {"\n" + pokemon.id}
        </Text>

        {/* Contenedor para la imagen de la Pokeball */}
        <View style={styles.pokeballContainer}>
          <Image
            source={require('../../../assets/pokeball-light.png')}
            style={styles.pokeball}
          />
        </View>

        {/* Imagen del Pokémon usando FadeInImage*/}
        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />

        {/* Muestras el tipo principal del Pokémon */}
        <Text style={[styles.name, { marginTop: 35 }]}>
          {pokemon.types[0]}
        </Text>
      </Card>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: '#306BAC',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    zIndex: 999,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});