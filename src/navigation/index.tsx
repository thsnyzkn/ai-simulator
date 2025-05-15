import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import InputScreen from "../screens/InputScreen";
import OutputScreen from "../screens/OutputScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Input"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#09090B",
          },
          headerTitleStyle: {
            color: "#FFFFFF",
          },
          contentStyle: {
            backgroundColor: "#09090B",
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Input"
          component={InputScreen}
          options={{ title: "AI Logo" }}
        />
        <Stack.Screen
          name="Output"
          component={OutputScreen}
          options={{ title: "Your Design" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
