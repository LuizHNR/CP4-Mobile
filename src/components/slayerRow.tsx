import { StyleSheet, Text, View, Image } from "react-native";

export type Personagem = {
  id: number;
  name: string;
  age: number;
  gender: string;
  race: string;
  description: string;
  quote: string;
  img: string;
};

export default function SlayerRow({ personagem }: { personagem: Personagem }) {
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: personagem.img }} style={styles.image} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{personagem.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#d4d4d4",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  }
});
