import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { getPokemon } from "../../actions/pokemons";
import { useQuery } from "@tanstack/react-query";
import { PokeballBackground } from "../components/ui/PokeballBackground";
import { globalTheme } from "../../config/theme/global-theme";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PokemonCard } from "../components/pokemos/PokemonCard";

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const { isLoading, data: pokemons = [] } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemon(0),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBackground style={styles.imgPosition} />

      <FlatList
        data={pokemons}
        style={{
          paddingTop: top + 20,
        }}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Pokedex</Text>
        )}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
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
});
