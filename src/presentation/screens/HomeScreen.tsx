import React from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { getPokemon } from "../../actions/pokemons";
import { useQuery } from "@tanstack/react-query";

export const HomeScreen = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemon(1,20),
    staleTime: 1000 * 60 * 60,
  });
 
  return (
    <View>
      <Text variant="displaySmall">Home</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Press me
        </Button>
      )} 
    </View>
  );
};
