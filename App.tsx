import "react-native-gesture-handler";
import { Navigator } from "./src/presentation/navigator/StackNavigatior";
import { ThemeContextProvider } from "./src/presentation/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeContextProvider>
      <Navigator />
    </ThemeContextProvider>
    </QueryClientProvider>
  );
}
