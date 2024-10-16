import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { getPokemon } from "../../actions/pokemons";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { PokeballBackground } from "../components/ui/PokeballBackground";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PokemonCard } from "../components/pokemos/PokemonCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/StackNavigatior";


interface Props extends StackScreenProps<RootStackParams, "HomeScreen"> {}

export const HomeScreen = ({navigation}:Props) => {
  const { top } = useSafeAreaInsets();

  const queryClient = useQueryClient();

  /* 
  peticion http
  const { isLoading, data: pokemons = [] } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemon(0),
    staleTime: 1000 * 60 * 60,
  });
 */

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", "infinity"],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async (params) => {
      const pokemons = await getPokemon(params.pageParam);

      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(["pokemon", pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  return (
    <View style={{ backgroundColor: "#918EF4" }}>
      <PokeballBackground style={styles.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        style={{
          paddingTop: top + 20,
        }}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            Pokedex
          </Text>
        )}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />

    {/* icono de busqueda */}
    
     <FAB
        icon="magnify"
        style={styles.fab}
        onPress={() => 
          navigation.push("SearchScrean")
        }
        mode="elevated"


      />
         


    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: "absolute",
    top: -100,
    right: -100,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 20,
    bottom: 20,
    backgroundColor: "#bba52ad5",
  },

});
