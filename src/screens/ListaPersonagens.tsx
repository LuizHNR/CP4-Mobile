import {View,StyleSheet,Text,Image,TouchableOpacity,ActivityIndicator,FlatList,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import SlayerRow from "../components/slayerRow";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPersonagens } from "../services/slayerService";
import { RootStackParamList } from "../../App";

type ListaNav = NativeStackNavigationProp<
  RootStackParamList,
  "ListaPersonagens"
>;

export default function ListaPersonagens() {
  const navigation = useNavigation<ListaNav>();

  const {
    data: personagens,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["personagens"],
    queryFn: getPersonagens,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#eb4435" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar personagens!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={{
          width: 200,
          height: 160,
          alignSelf: "center",
          marginBottom: 10,
          marginTop: 10,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 17,
          fontWeight: "500",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Escolha seu personagem abaixo
      </Text>
      <FlatList
        data={personagens ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DetalhesPersonagens", {
                personagemId: item.id,
              })
            }
          >
            <SlayerRow personagem={item} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
