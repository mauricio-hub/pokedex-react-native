import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { getPokemon } from "../../actions/pokemons";
import { useQuery } from "@tanstack/react-query";
import { PokeballBackground } from "../components/ui/PokeballBackground";

export const HomeScreen = () => {
  const { isLoading, data = [] } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemon(0),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View style={{}}>
      <PokeballBackground style={styles.imgPosition} />
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
