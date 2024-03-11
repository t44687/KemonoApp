import {useEffect, useState} from "react";
import {Alert, FlatList, ImageBackground, Pressable, View} from "react-native";
import {Card} from "galio-framework";
import styles from "./Styles/PostsScreenStyles"
import GlobalStyles from "../../Style/GlobalStyles";

export default function PostsScreen() {
    const [posts, setPosts] = useState()

    const getPosts = () => {
        return fetch('https://kemono.su/api/v1/posts')
            .then(response => response.json())
            .then(json => setPosts(json))
            .catch(error => console.error(error))
    }

    const createPostCard = (post) => {
        return (
            <Pressable onPress={() => Alert.alert('test', post.item.id)}>
                <Card
                    flex
                    style={styles.card}
                    titleColor={'#fff'}
                    title={post.item.title}
                    caption={post.item.attachments.length + " attachments"}
                    avatar={"https://img.kemono.su/banners/"+post.item.service+"/"+post.item.user}
                    image={"https://img.kemono.su/thumbnail/data/"+post.item.file.path}
                />
            </Pressable>
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