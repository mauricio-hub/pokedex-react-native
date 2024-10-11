import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { PokemonScreen } from "../screens/pokemon/PokemonScreen";
import { SearchScrean } from "../screens/search/SearchScrean";


/* tipo de dato */

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {pokemonId:number};
  SearchScrean: undefined;
};


const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      <Stack.Screen name="SearchScrean" component={SearchScrean} />
    </Stack.Navigator>
  );
};
