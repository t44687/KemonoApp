import {Block, Text} from "galio-framework";
import {FlatList, StyleSheet} from "react-native";
import globalStyles from "../../Style/GlobalStyles";
import GlobalStyles from "../../Style/GlobalStyles";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import ArtistsSearchForm from "../ArtistsScreen/Components/ArtistsSearchForm";
import CustomActivityIndicator from "../../Component/CustomActivityIndicator";
import Pagination from "../../Component/Pagination";
import ArtistCard from "../../Component/ArtistCard";
import FavoriteFilterForm from "./Components/FavoriteFilterForm";
import PostCard from "../../Component/PostCard";

const styles = StyleSheet.create({
    Title: {
        fontSize: 40,
    },
});

export default function FavoriteScreen() {
    const navigation = useNavigation()
    const [session, setSession] = useState("")
    const [favoriteArtists, setFavoriteArtists] = useState([])
    const [favoritePosts, setFavoritePosts] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [type, setType] = useState("artist")
    const [filter, setFilter] = useState({
        "sortBy": "updated_timestamp",
        "order": 0
    })
    
    const getFavoriteArtists = () => {
        return fetch('https://kemono.su/api/v1/account/favorites?type=artist')
            .then(response => {
                if (response.status === 200){
                    return response.json()
                }else if (response.status === 401){
                    navigation.navigate("Login")
                    throw new Error("Unauthorized");
                }
            })
            .then(json => {
                json = json.map(e => {
                    e.updated_timestamp = Date.parse(e.updated)
                    e.last_imported_timestamp = Date.parse(e.last_imported)
                    return e
                })
                setFavoriteArtists(json)
            })
            .catch(error => {
                console.error(error)
            })
    }
    const getFavoritePosts = () => {
        return fetch('https://kemono.su/api/v1/account/favorites?type=post')
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    navigation.navigate("Login")
                    throw new Error("Unauthorized");
                }
            })
            .then(json => {
                json = json.map(e => {
                    e.published_timestamp = Date.parse(e.published)
                    return e
                })
                setFavoritePosts(json)
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
    const getEndIndex = (dataList) => {
        let endIndex = startIndex + 50
        if (endIndex > dataList.length){
            endIndex = dataList.length
        }
        return endIndex
    }
    const onPageChange = (pageIndex) => {
        let newStartIndex = (pageIndex-1)*50

        if (newStartIndex !== startIndex){
            setStartIndex(newStartIndex)
        }
    }
    const OnFilterChange = (key, value) => {
        setFilter(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const createArtistCard = (artist) => {
        if (artist.item === undefined){
            return null
        }

        return (
            <ArtistCard
                id={artist.item.id}
                name={artist.item.name}
                service={artist.item.service}
                updated={artist.item.updated}
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
    const createPostCard = (post) => {
        return (
            <PostCard
                id={post.item.id}
                title={post.item.title}
                published={post.item.published}
                attachmentsLength={post.item.attachments.length}
                service={post.item.service}
                user={post.item.user}
                filePath={post.item.file.path}
                onClick={(id) => navigation.navigate(
                    'PostDetailScreen',
                    {
                        postId: id,
                        artistId: post.item.user,
                        service: post.item.service
                    }
                )}
            />
        )
    }
    
    const GenerateArtistsCard = ({dataList, renderItem}) => {
        let temp = dataList
        if (filter.order){
            temp = temp.sort((a,b) => a[filter.sortBy] - b[filter.sortBy])
        }else{
            temp = temp.sort((a,b) => b[filter.sortBy] - a[filter.sortBy])
        }
        
        // let filteredCreators = creators.filter((creator) => creator['name'].includes(queryCreator.name))
        let cardList = []

        let endIndex = Math.min(getEndIndex(temp), dataList.length-1)
        for (let i = startIndex; i < endIndex; i++){
            cardList.push(temp[i])
        }

        return <FlatList
            style={styles.container}
            data={cardList}
            renderItem={renderItem}
            ListHeaderComponent={
                <FavoriteFilterForm
                    type={type}
                    sortBy={filter.sortBy}
                    order={filter.order}
                    onTypeChange={(value) => setType(value)}
                    onSortByChange={(value) => OnFilterChange("sortBy", value)}
                    onOrderChange={(value) => OnFilterChange("order", value)}
                />
            }
            ListEmptyComponent={<CustomActivityIndicator />}
            ListFooterComponent={
                <Pagination
                    currentPage={(startIndex / 50)+1}
                    total={temp.length}
                    maxPageShown={5}
                    onPageChange={(pageIndex) => onPageChange(pageIndex)}
                />
            }
        />
    }
    
    useEffect(() => {
        getFavoriteArtists()
        getFavoritePosts()
    }, []);
    useEffect(() => {
        if (type === "artist"){
            OnFilterChange("sortBy", "updated_timestamp")
        }else{
            OnFilterChange("sortBy", "faved_seq")
        }
    }, [type]);
    
    
    return (
        <Block  style={globalStyles.container}>
            <Text style={[GlobalStyles.text, styles.Title]}>Favorite</Text>
            <GenerateArtistsCard 
                dataList={type === "artist" ? favoriteArtists : favoritePosts}
                renderItem={type === "artist" ? createArtistCard : createPostCard}
            />
        </Block>
    )
} 