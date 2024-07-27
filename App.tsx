import "react-native-gesture-handler";
import { Navigator } from "./src/presentation/navigator/StackNavigatior";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
