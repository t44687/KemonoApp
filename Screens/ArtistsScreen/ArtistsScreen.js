import {Alert, FlatList, Pressable, View} from "react-native";
import GlobalStyles from "../../Style/GlobalStyles";
import {useEffect, useState} from "react";
import {Card, Text} from "galio-framework";
import styles from "./Styles/ArtistsScreenStyles"
import {log} from "expo/build/devtools/logger";

export default function ArtistsScreen({ navigation, route }){
    const [creaters, setCreaters] = useState([])

    const getCreators = () => {
        return fetch('https://kemono.su/api/v1/creators.txt')
            .then(response => response.json())
            .then(json => {
                setCreaters(json)
            })
    }
    const getStartIndex = () => {
        let {startIndex} = route.params
        if (startIndex === undefined){
            startIndex = 0
        }
        return startIndex
    }
    const getEndIndex = () => {
        let endIndex = getStartIndex() + 50
        if (endIndex > creaters.length){
            endIndex = creaters.length
        }
        return endIndex
    }
    const createArtistCard = (artist) => {

        return (
            <Pressable onPress={() => Alert.alert('test', artist.item.id)}>
                <Card
                    flex
                    style={styles.card}
                    titleColor={'#fff'}
                    title={artist.item.name}
                    caption={artist.item.favorited + " favorited"}
                    image={"https://img.kemono.su/banners/"+artist.item.service+"/"+artist.item.id}
                    avatar={"https://img.kemono.su/icons/"+artist.item.service+"/"+artist.item.id}
                />
            </Pressable>
        )
    }
    const CurrentIndex = () => {
        return <Text style={{"color":"#fff"}}>
            {"Showing "+getStartIndex()+" - "+getEndIndex()+" of "+creaters.length}
        </Text>
    }

    const generateArtistsCard = () => {
        let startIndex = getStartIndex()

        let endIndex = getEndIndex()

        let artistsCards = []
        for (let i = startIndex; i < endIndex; i++){
            artistsCards.push(creaters[i])
        }

        return <FlatList
            style={styles.container}
            data={artistsCards}
            renderItem={createArtistCard}
        />
    }

    useEffect(() => {
        getCreators()
    }, []);
    // useEffect(() => {
    //     generateArtistsCard()
    // }, [creaters]);

    return (
        <View style={GlobalStyles.container}>
            <CurrentIndex />
            {generateArtistsCard()}
            <CurrentIndex />
        </View>
    )
}