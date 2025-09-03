import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import ListaPersonagens from './scr/screens/ListaPersonagens';
import DetalhesPersonagens from './scr/screens/DetalhesPersonagens';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: 'white', primary: '#128ee0' }
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="ListaPersonagens"
            component={ListaPersonagens}
            options={{ title: "Demon Slayer" }}
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
