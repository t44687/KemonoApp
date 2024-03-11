import {Alert, FlatList, ImageBackground, Pressable, View} from "react-native";
import GlobalStyles from "../../Style/GlobalStyles";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text} from "galio-framework";
import styles from "./Styles/ArtistsScreenStyles"

export default function ArtistsScreen({ navigation, route }){
    const [creaters, setCreaters] = useState([])
    const [useCache, setUseCache] = useState(true)

    const cachedCreators = require('../../assets/Cache/creators.json')

    const setCreatersWithFilters = (loadedCreaters) => {
        let sortedCreaters = loadedCreaters.sort((a,b) => b.favorited - a.favorited)
        setCreaters(sortedCreaters)
    }

    const getCreators = () => {
        console.log("get creators")

        return fetch('https://kemono.su/api/v1/creators')
            .then(response => response.json())
            .then(json => {
                setCreatersWithFilters(json)
                setUseCache(false)
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
        let indexMsg = ""

        if (useCache){
            console.log("using cache")
            indexMsg = "Using cache for now, please wait"
        }else{
            indexMsg = "Showing "+(getStartIndex()+1)+" - "+getEndIndex()+" of "+creaters.length
        }

        return <Text style={{"color":"#fff"}}>
            {indexMsg}
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
        setCreatersWithFilters(cachedCreators)
        getCreators()
    }, []);

    return (
        <View style={GlobalStyles.container}>
            <CurrentIndex />
            {generateArtistsCard()}
        </View>
    )
}