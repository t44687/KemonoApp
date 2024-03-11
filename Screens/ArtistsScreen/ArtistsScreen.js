import {Alert, FlatList, ImageBackground, Pressable, View} from "react-native";
import GlobalStyles from "../../Style/GlobalStyles";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text} from "galio-framework";
import styles from "./Styles/ArtistsScreenStyles"
import * as FileSystem from "expo-file-system"
import {EncodingType} from "expo-file-system";
import {log} from "expo/build/devtools/logger";

export default function ArtistsScreen({ navigation, route }){
    const [creaters, setCreaters] = useState([])

    const getCreators = () => {
        console.log("get creators")

        return fetch('https://kemono.su/api/v1/creators')
            .then(response => response.json())
            .then(json => {
                AsyncStorage.setItem('creators', json)
                let sortedJson = json.sort((a,b) => b.favorited - a.favorited)
                console.log(sortedJson[0])
                setCreaters(sortedJson)
                console.log("got creators")
            })
            .catch(error => {
                console.error(error)
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
            {"Showing "+(getStartIndex()+1)+" - "+getEndIndex()+" of "+creaters.length}
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
        AsyncStorage.getItem('creators')
            .then(json => {
                console.log("cached creators: " + json)
                if (json == null){
                    getCreators()
                }else {
                    json = JSON.parse(json)
                    setCreaters(json.sort((a,b) => {
                        a.favorited > b.favorited
                    }))
                }
            })
        // getCreators()
    }, []);

    return (
        <View style={GlobalStyles.container}>
            <CurrentIndex />
            {generateArtistsCard()}
            <CurrentIndex />
        </View>
    )
}