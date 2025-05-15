import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";

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
          options={({ navigation }) => ({
            title: "Your Design",
            presentation: 'modal',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '300' }}>✕</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
