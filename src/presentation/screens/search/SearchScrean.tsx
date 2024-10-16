import React from "react";
import { View, Text } from "react-native";
import { globalTheme } from "../../../config/theme/global-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Pokemon } from "../../../domain/entities/pokemon";
import { PokemonCard } from "../../components/pokemos/PokemonCard";

export const SearchScrean = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
      <TextInput
        placeholder="Buscar Pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={(value) => console.log(value)}
        value=""
        style={{
          backgroundColor: "white",
          height: 40,
          borderRadius: 20,
          paddingHorizontal: 10,
          fontSize: 20,
        }}
      />

      <ActivityIndicator
        animating={true}
        color="#5856D6"
        size={50}
        style={{ marginTop: 20 }}
      />

      <FlatList
        data={[] as Pokemon[]}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
