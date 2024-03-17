import {Alert, FlatList, ImageBackground, Pressable, View} from "react-native";
import GlobalStyles from "../../Style/GlobalStyles";
import {PureComponent, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text} from "galio-framework";
import styles from "./Styles/ArtistsScreenStyles"
import Pagination from "../../Component/Pagination";
import ArtistCard from "../../Component/ArtistCard"

export default function ArtistsScreen({ navigation, route }){
    const [creaters, setCreaters] = useState([])
    const [useCache, setUseCache] = useState(true)
    const [startIndex, setStartIndex] = useState(0)

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
        let {startIndexParam} = route.params
        if (startIndexParam === undefined){
            startIndexParam = 0
        }
        setStartIndex(startIndexParam)
    }
    const getEndIndex = () => {
        let endIndex = startIndex + 50
        if (endIndex > creaters.length){
            endIndex = creaters.length
        }
        return endIndex
    }
    const onPageChange = (pageIndex) => {
        let newStartIndex = (pageIndex-1)*50

        if (newStartIndex !== startIndex){
            setStartIndex(newStartIndex)
        }
    }

    const createArtistCard = (artist) => {

        return (
            <ArtistCard
                id={artist.item.id}
                name={artist.item.name}
                favorited={artist.item.favorited}
                service={artist.item.service}
                onClick={(id, service) => navigation.navigate(
                    'ArtistDetailScreen',
                    {
                        artistId: id,
                        service: service
                    }
                )}
            />
        )
    }
    const CurrentIndex = () => {
        let indexMsg = ""

        if (useCache){
            indexMsg = "Using cache for now, please wait"
        }else{
            indexMsg = "Showing "+(startIndex+1)+" - "+getEndIndex()+" of "+creaters.length
        }

        return <Text style={{"color":"#fff"}}>
            {indexMsg}
        </Text>
    }

    const generateArtistsCard = () => {
        let endIndex = getEndIndex()

        let artistsCards = []
        for (let i = startIndex; i < endIndex; i++){
            artistsCards.push(creaters[i])
        }

        return <FlatList
            style={styles.container}
            data={artistsCards}
            renderItem={createArtistCard}
            ListFooterComponent={
                <Pagination
                    currentPage={(startIndex / 50)+1}
                    total={creaters.length}
                    maxPageShown={5}
                    onPageChange={(pageIndex) => onPageChange(pageIndex)}
                />
            }
        />
    }

    useEffect(() => {
        setCreatersWithFilters(cachedCreators)
        getStartIndex()
        getCreators()
    }, []);

    return (
        <View style={GlobalStyles.container}>
            <CurrentIndex />
            {generateArtistsCard()}
        </View>
    )
}