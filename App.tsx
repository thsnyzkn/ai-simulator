import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="light" />
      <Navigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090B",
    padding: 20,
  },
});
