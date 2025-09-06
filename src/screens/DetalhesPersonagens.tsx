import { View, StyleSheet, Text, Image, ScrollView, ActivityIndicator, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Personagem } from "../components/slayerRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";


const background_human = require("../../assets/background-human.png");
const background_demon = require("../../assets/background-demon.png");


type Props = NativeStackScreenProps<RootStackParamList, "DetalhesPersonagens">;

export default function DetalhesPersonagens({ route }: Props) {
  const { personagemId } = route.params;

  const [character, setCharacter] = useState<Personagem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.demonslayer-api.com/api/v1/characters?id=${personagemId}`
        );
        setCharacter((response.data.content as Personagem[])[0]);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacter();
  }, [personagemId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b535eb" />
      </View>
    );
  }

  if (error || !character) {
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar personagem.</Text>
      </View>
    );
  }

  // Define o background de acordo com a raça
  const backgroundImage =
    character.race === "Human" ? background_human : background_demon;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={{ uri: character.img }}
            style={styles.characterImage}
            resizeMode="contain"
          />

          <View style={styles.infoCard}>
            <Text style={styles.name}>{character.name}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>
                Idade: <Text style={styles.value}>{character.age}</Text>
              </Text>
              <Text style={styles.label}>
                Raça: <Text style={styles.value}>{character.race}</Text>
              </Text>
              <Text style={styles.label}>
                Gênero: <Text style={styles.value}>{character.gender}</Text>
              </Text>
            </View>

            <Text style={styles.description}>{character.description}</Text>
            <Text style={styles.quote}>"{character.quote}"</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  characterImage: {
    width: "80%",
    height: undefined,
    aspectRatio: 1,
    marginBottom: -30,
    zIndex: 1,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    zIndex: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: "100%",
  },
  name: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 4,
  },
  value: {
    color: "red",
    fontWeight: "normal",
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 12,
  },
  quote: {
    fontStyle: "italic",
    backgroundColor: "#000000",
    borderRadius: 8,
    color: "#fff",
    textAlign: "center",
    padding: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
