import {Block, Button, Card, Text} from "galio-framework";
import {useEffect, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Alert, FlatList, Image, View} from "react-native";
import GlobalStyles from "../../Style/GlobalStyles";
import styles from "./Styles/ArtistDetailScreenStyles"
import PostCard from "../../Component/PostCard";
import CustomActivityIndicator from "../../Component/CustomActivityIndicator";

export default function (){
    const [artistData, setArtistData] = useState({})
    const [postList, setPostList] = useState([])
    const [startIndex, setStartIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const navigation = useNavigation()
    const route = useRoute()
    const {artistId, service, favoritePosts} = route.params

    const getArtistData = () => {
        return fetch(`https://kemono.su/api/v1/${service}/user/${artistId}/profile`)
            .then(response => response.json())
            .then(json => setArtistData(json))
            .catch(error => {
                console.error(error)
            })
    }
    const getArtistPosts = () => {
        console.log("getting posts")
        return fetch(`https://kemono.su/api/v1/${service}/user/${artistId}?o=${startIndex}`)
            .then(response => response.json())
            .then(json => {
                setIsLoading(false)
                setPostList(json)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const createPostCard = (post) => {
        if (post.item === undefined){
            return null
        }

        return <PostCard
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
                    artistId: artistId,
                    service: service,
                    favoritePosts: favoritePosts
                }
            )}
        />
    }

    const ServiceImage = ({service}) => {
        let image = null

        if (service === undefined){
            return null
        }

        switch (service){
            case "fanbox":
                image = require('../../assets/Images/fanbox.png')
                break
            case "patreon":
                image = require('../../assets/Images/patreon.png')
                break
            default:
                return null
        }

        return <Image
            style={styles.artistInfoBlockServiceImage}
            source={image}
        />
    }
    const ArtistInfo = () => {
        return <Block style={styles.artistInfoBlock}>
            <Block style={styles.artistInfoBlockHead}>
                <Image
                    style={styles.artistInfoBlockAvatarImage}
                    source={{uri: "https://img.kemono.su/icons/"+artistData["service"]+"/"+artistData["id"]}}
                />
                <Block style={styles.artistInfoBlockData}>
                    <ServiceImage service={artistData["service"]} />
                    <Text style={styles.artistInfoBlockName}>{artistData["name"]}</Text>
                </Block>
            </Block>
            <Image
                source={{uri: "https://img.kemono.su/banners/"+artistData["service"]+"/"+artistData["id"]}}
                style={styles.artistInfoBlockImage}
            >
            </Image>
        </Block>
    }
    const TotalLessPagination = () => {
        return <View style={styles.artistPostPagin}>
            {startIndex > 0 && <Button
                onPress={()=> setStartIndex(startIndex - 50)}
                style={styles.artistPostPaginBtn}
            >Previous</Button>}
            {postList.length === 50 && <Button
            onPress={()=> setStartIndex(startIndex + 50)}
            style={styles.artistPostPaginBtn}
        >Next</Button>}
        </View>
    }

    useEffect(() => {
        getArtistData()
    }, [artistId]);
    useEffect(() => {
        if (artistData["id"] !== undefined){
            getArtistPosts()
        }
    }, [artistData, startIndex]);
    useEffect(() => {
        console.log("startIndex: " + startIndex)
    }, [startIndex]);

    return (
        <View style={GlobalStyles.container}>
            {isLoading && <CustomActivityIndicator />}
            <FlatList
                style={styles.container}
                data={postList}
                renderItem={createPostCard}
                ListHeaderComponent={ArtistInfo}
                ListFooterComponent={TotalLessPagination}
            />
        </View>
    )
}