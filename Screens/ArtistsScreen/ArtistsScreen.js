import {Alert, FlatList, ImageBackground, Pressable, View} from "react-native";
import GlobalStyles from "../../Style/GlobalStyles";
import {PureComponent, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text} from "galio-framework";
import styles from "./Styles/ArtistsScreenStyles"
import Pagination from "../../Component/Pagination";
import ArtistCard from "../../Component/ArtistCard"
import ArtistsSearchForm from "./Components/ArtistsSearchForm";

export default function ArtistsScreen({ navigation, route }){
    const cachedCreators = require('../../assets/Cache/creators.json')

    const [creators, setCreators] = useState(cachedCreators)
    const [filteredCreators, setFilteredCreators] = useState([])
    const [useCache, setUseCache] = useState(true)
    const [startIndex, setStartIndex] = useState(0)

    const [queryCreator, setQueryCreator] = useState({
        "name": "",
        "service": ""
    })

    const setCreatersWithFilters = () => {
        let temp = []
        if (queryCreator.name === ""){
            temp = creators // skip name filtering
        }else {
            temp = creators.filter((creator) => creator['name'].toLowerCase().includes(queryCreator.name.toLowerCase()))
        }
        if (queryCreator.service !== ""){
            temp = temp.filter((creator) => creator['service'].toLowerCase() === queryCreator.service)
        }
        temp = temp.sort((a,b) => b.favorited - a.favorited)
        setFilteredCreators(temp)
        setStartIndex(0)
    }

    const getCreators = () => {
        return fetch('https://kemono.su/api/v1/creators')
            .then(response => response.json())
            .then(json => {
                setCreators(json)
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
        if (endIndex > filteredCreators.length){
            endIndex = filteredCreators.length
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

        if (artist.item === undefined){
            return null
        }

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
            indexMsg = "Showing "+(startIndex+1)+" - "+getEndIndex()+" of "+filteredCreators.length
        }

        return <Text style={{"color":"#fff"}}>
            {indexMsg}
        </Text>
    }

    const OnFilterChange = (key, value) => {
        setQueryCreator(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const generateArtistsCard = () => {
        console.log("start generating artist cards")

        // let filteredCreators = creators.filter((creator) => creator['name'].includes(queryCreator.name))
        let artistsCards = []

        let endIndex = Math.min(getEndIndex(), filteredCreators.length-1)
        for (let i = startIndex; i < endIndex; i++){
            artistsCards.push(filteredCreators[i])
        }

        return <FlatList
            style={styles.container}
            data={artistsCards}
            renderItem={createArtistCard}
            ListHeaderComponent={
                <ArtistsSearchForm
                    name={queryCreator.name}
                    service={queryCreator.service}
                    onNameChange={(name) => OnFilterChange("name", name)}
                    onServiceChange={(serviceName) => OnFilterChange("service", serviceName)}
                />
            }
            ListFooterComponent={
                <Pagination
                    currentPage={(startIndex / 50)+1}
                    total={filteredCreators.length}
                    maxPageShown={5}
                    onPageChange={(pageIndex) => onPageChange(pageIndex)}
                />
            }
        />
    }

    useEffect(() => {
        getStartIndex()
        getCreators()
    }, []);
    useEffect(() => {
        if (creators.length >= 0){
            setCreatersWithFilters()
        }
    }, [queryCreator]);

    return (
        <View style={GlobalStyles.container}>
            <CurrentIndex />
            {generateArtistsCard()}
        </View>
    )
}