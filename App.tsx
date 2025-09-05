import React from "react";
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
            options={{ title: "Personagens" }}
          />
          <Stack.Screen
            name="DetalhesPersonagens"
            component={DetalhesPersonagens}
            options={{ title: "Detalhes" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
