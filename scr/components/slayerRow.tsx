import { StyleSheet, Text, View, Image } from 'react-native'

export type Personagem = {
    id: number;
    name: string;
    age: number;
    gender: string;
    race: string;
    description: string;
    quote: string;
    img: string;
}

export default function SlayerRow({personagem}: {personagem: Personagem}) {
    return(
        <View style={ styles.container }>
            <Image
                source={ {uri: personagem.img } }
                style={ styles.image }
            />
            <Text>{personagem.name}</Text>
            <Text>{personagem.age}</Text>
            <Text>{personagem.gender}</Text>
            <Text>{personagem.race}</Text>
            <Text>{personagem.description}</Text>
            <Text>{personagem.quote}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: 50,
        height: 80,
        borderRadius: 8,
        marginLeft: 12
    },
    title: {
        marginHorizontal: 10,
        fontSize: 16,
        width: '50%'
    },
    rating: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        color: "#666",
        marginRight: 12
    }
})