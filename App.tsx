import "react-native-gesture-handler";
import { Navigator } from "./src/presentation/navigator/StackNavigatior";
import { ThemeContextProvider } from "./src/presentation/context/ThemeContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <Navigator />
    </ThemeContextProvider>
  );
}
