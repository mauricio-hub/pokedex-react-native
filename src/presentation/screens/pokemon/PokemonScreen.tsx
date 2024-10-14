import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View, FlatList, ScrollView, Image, StyleSheet } from "react-native";
import { RootStackParams } from "../../navigator/StackNavigatior";
import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "../../../actions/pokemons/get-pokemon-by-id";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { Chip, Text, useTheme } from "react-native-paper";
import { Formatter } from "../../../config/helpers/formatters";
import { FadeInImage } from "../../components/ui/FadeInImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "../../context/ThemeContext";

interface Props extends StackScreenProps<RootStackParams, "PokemonScreen"> {}

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { pokemonId } = route.params;

  
  const {top} = useSafeAreaInsets();
  const {isDark} = useContext(ThemeContext)


  const pokeballImg = isDark ? require('../../../assets/pokeball-dark.png') : require('../../../assets/pokeball-light.png')


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


  if(!pokemon || isLoading){
    return (<FullScreenLoader/>)
  }

  return (
    <ScrollView
    style={ { flex: 1, backgroundColor:'#c8f0f4' } }
    bounces={ false }
    showsVerticalScrollIndicator={ false }>
    {/* Header Container */ }
    <View style={ styles.headerContainer }>
      {/* Nombre del Pokemon */ }
      <Text
        style={ {
          ...styles.pokemonName,
          top: top + 5,
        } }>
        { Formatter.capitalize( pokemon.name ) + '\n' }#{ pokemon.id }
      </Text>
  
      {/* Pokeball */ }
      <Image source={ pokeballImg } style={ styles.pokeball } />
  
      <FadeInImage uri={ pokemon.avatar } style={ styles.pokemonImage } />
    </View>
  
    {/* Types */ }
    <View
      style={ { flexDirection: 'row', marginHorizontal: 20, marginTop: 10 } }>
      { pokemon.types.map( type => (
        <Chip
          key={ type }
          mode="outlined"
          selectedColor="white"
          style={ { marginLeft: 10 } }>
          { type }
        </Chip>
      ) ) }
    </View>
  
    {/* Sprites */ }
    <FlatList
      data={ pokemon.sprites }
      horizontal
      keyExtractor={ item => item }
      showsHorizontalScrollIndicator={ false }
      centerContent
      style={ {
        marginTop: 20,
        height: 100,
      } }
      renderItem={ ( { item } ) => (
        <FadeInImage
          uri={ item }
          style={ { width: 100, height: 100, marginHorizontal: 5 } }
        />
      ) }
    />
  
  
    <View style={ { height: 100 } } />
  </ScrollView>
  
  );
};



const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  
});