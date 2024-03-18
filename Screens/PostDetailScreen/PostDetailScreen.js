import GlobalStyles from "../../Style/GlobalStyles";
import {Alert, Image, SafeAreaView, ScrollView, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {Block, Button, Text} from "galio-framework";
import styles from "./PostDetailScreenStyles";
import {htmlCodeConvertor} from "../../Component/HtmlCodeConvertor";
import AutoAdjustHeightImage from "../../Component/AutoAdjustHeightImage";
import {Video, ResizeMode} from "expo-av";

export default function () {
    // const video = React.useRef(null);

    const [postData, setPostData] = useState({})
    const [artistData, setArtistData] = useState({})

    const route = useRoute()
    const {postId, artistId, service} = route.params

    const isFileImage = (fileName) => {

        return fileName.includes(".png") ||
            fileName.includes(".jpg") ||
            fileName.includes(".jpeg") ||
            fileName.includes(".gif")
    }
    const isFileVideo = (fileName) => {

        return fileName.includes(".mp4")
    }

    const getPostDetail = () => {
        return fetch(`https://kemono.su/api/v1/${service}/user/${artistId}/post/${postId}`)
            .then(response => response.json())
            .then(json => setPostData(json))
            .catch(error => {
                console.error(error)
            })
    }
    const getArtistData = () => {
        return fetch(`https://kemono.su/api/v1/${service}/user/${artistId}/profile`)
            .then(response => response.json())
            .then(json => setArtistData(json))
            .catch(error => {
                console.error(error)
            })
    }

    const CreaterInfo = () => {
        return <Block style={styles.artistInfoBlock}>
            <Block style={styles.artistInfoBlockHead}>
                <Image
                    style={styles.artistInfoBlockAvatarImage}
                    source={{uri: "https://img.kemono.su/icons/"+artistData["service"]+"/"+artistData["id"]}}
                />
                <Block style={styles.artistInfoBlockData}>
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

    const PostInfo = () => {
        return <Block style={styles.postInfoBlock}>
            <Text style={styles.postInfoBlockPostName}>{postData["title"]} + ({postData["service"]})</Text>
            <Text style={styles.postInfoBlockPostPublished}>Published:    {postData["published"] !== undefined ? postData["published"].replace("T", " ") : ""}</Text>
            <Text style={styles.postInfoBlockPostEdited}>Edited:       {postData["edited"] !== undefined ? postData["edited"].replace("T", " ") : ""}</Text>
            <Block style={styles.postInfoBlockPostBtnGroup}>
                <Button>Flagged</Button>
                <Button>Favorite</Button>
            </Block>
        </Block>
    }

    const PostContentAttachmentsImages = () => {
        if (postData["attachments"] === undefined){
            return null
        }

        let Images = postData["attachments"].map((attachment) => {
            if (isFileImage(attachment["name"])){
                return <AutoAdjustHeightImage
                    styles={styles.postContentFileImage}
                    uri={`https://img.kemono.su/thumbnail/data/${attachment["path"]}`}
                />
            }
        })

        if (Images.length === 0){
            return null
        }

        return <Block>
            <Text style={[styles.postContentText, styles.postContentFile]}>Images</Text>
            {Images}
        </Block>
    }

    const PostContentAttachmentsVideos = () => {
        if (postData["attachments"] === undefined){
            return null
        }

        let Videos = postData["attachments"].map((attachment) => {

            if (isFileVideo(attachment["name"])){
                return <Video
                    style={styles.postContentAttachmentsVideo}
                    source={{
                        uri: `https://c6.kemono.su/data/${attachment["path"]}`,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    onError={(error) => console.log(error)}
                    onLoad={status => console.log(status)}
                />
            }
        })

        if (Videos.length === 0){
            return null
        }

        return <Block>
            <Text style={[styles.postContentText, styles.postContentFile]}>Videos</Text>
            {Videos}
        </Block>
    }

    const PostContent = () => {

        return <Block style={styles.postContentBlock}>
            <Text style={[styles.postContentText, styles.postContentContent]}>Content</Text>
            <Text style={[styles.postContentText]}>{htmlCodeConvertor(postData["content"])}</Text>
            <Text style={[styles.postContentText, styles.postContentFile]}>Files</Text>
            {postData["file"] !== undefined && <AutoAdjustHeightImage styles={styles.postContentFileImage} uri={`https://img.kemono.su/thumbnail/data/${postData["file"]["path"]}`} />}
            <PostContentAttachmentsImages />
            <PostContentAttachmentsVideos />
        </Block>
    }

    useEffect(() => {
        getPostDetail()
    }, [postId, artistId, service]);
    useEffect(() => {
        console.log("getting artist data")
        getArtistData()
    }, [artistId, service]);

    return <SafeAreaView style={GlobalStyles.container}>
        <ScrollView>
            <CreaterInfo />
            <PostInfo />
            <PostContent />
        </ScrollView>
    </SafeAreaView>
}