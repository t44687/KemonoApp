import {useEffect, useState} from "react";
import {Alert, FlatList, ImageBackground, Pressable, View} from "react-native";
import {Card} from "galio-framework";
import styles from "./Styles/PostsScreenStyles"
import GlobalStyles from "../../Style/GlobalStyles";
import PostCard from "../../Component/PostCard";
import {useNavigation} from "@react-navigation/native";

export default function PostsScreen() {
    const navigation = useNavigation()
    
    const [posts, setPosts] = useState()

    const getPosts = () => {
        return fetch('https://kemono.su/api/v1/posts')
            .then(response => response.json())
            .then(json => setPosts(json))
            .catch(error => console.error(error))
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

    const generateArtistsCard = () => {

        return <FlatList
            style={styles.container}
            data={posts}
            renderItem={createPostCard}
        />
    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <View style={GlobalStyles.container}>
            {generateArtistsCard()}
        </View>
    )
}