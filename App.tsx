import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ListaPersonagens from "./src/screens/ListaPersonagens";
import DetalhesPersonagens from "./src/screens/DetalhesPersonagens";

export type RootStackParamList = {
  ListaPersonagens: undefined;
  DetalhesPersonagens: { personagemId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient(); 

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ListaPersonagens"
            component={ListaPersonagens}
            options={{ title: "Demon Slayer", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="DetalhesPersonagens"
            component={DetalhesPersonagens}
            options={({ navigation }) => ({
              title: "Detalhes",
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ paddingHorizontal: 10 }}
                >
                  <Text style={{ color: "#0066CC", fontSize:16 }}>
                    Demon Slayer
                  </Text>
                </TouchableOpacity>
              ),
              headerBackVisible: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
