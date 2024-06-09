import GlobalStyles from "../../Style/GlobalStyles";
import {Alert, Image, Platform, Pressable, SafeAreaView, ScrollView, ActivityIndicator, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {Block, Button, Text, Slider, Accordion} from "galio-framework";
import styles from "./PostDetailScreenStyles";
import {htmlCodeConvertor} from "../../Component/HtmlCodeConvertor";
import AutoAdjustHeightImage from "../../Component/AutoAdjustHeightImage";
import * as FileSystem from "expo-file-system"
import HDImageViewerPopup from "../../Component/HDImageViewerPopup";
import CustomActivityIndicator from "../../Component/CustomActivityIndicator";
import CustomProgress from "../../Component/CustomProgress";
import {AutoAdjustVideoPlayer} from "../../Component/AutoAdjustVideoPlayer";
import { List } from 'react-native-paper';

export default function () {
    const [postData, setPostData] = useState({})
    const [artistData, setArtistData] = useState({})
    const [downloadProcess, setDownloadProcess] = useState(1)
    const [showDownloadPopup, setShowDownloadPopup] = useState(false)
    const [detailImageUri, setDetailImageUri] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const [playingVideo, setPlayingVideo] = useState("")

    const [isFavorited, setIsFavorited] = useState(false)
    const [isFavoritedLoading, setIsFavoritedLoading] = useState(false)

    const navigation = useNavigation()
    const route = useRoute()
    const {postId, artistId, service, favoritePosts = null} = route.params

    const isFileImage = (fileName) => {

        return fileName.includes(".png") ||
            fileName.includes(".jpg") ||
            fileName.includes(".jpeg") ||
            fileName.includes(".gif")
    }

    const isFileVideo = (fileName) => {

        return fileName.includes(".mp4")
    }

    //region Async
    const getPostDetail = () => {
        return fetch(`https://kemono.su/api/v1/${service}/user/${artistId}/post/${postId}`)
            .then(response => response.json())
            .then(json => {
                setPostData(json)
                setIsLoading(false)
            })
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
    const checkFavoriteByAPI = () => {
        setIsFavoritedLoading(true)
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
                setIsFavorited(checkIsFavorited(json))
                setIsFavoritedLoading(false)
            })
            .catch(error => {
                console.error(error)
                setIsFavoritedLoading(false)
            })
    }
    const addFavoritePost = async () => {
        fetch(`https://kemono.su/api/v1/favorites/post/${service}/${artistId}/${postId}`, {
            method: 'POST',
        }).then(checkFavoriteByAPI())
    }
    const removeFavoritePost = async () => {
        fetch(`https://kemono.su/api/v1/favorites/post/${service}/${artistId}/${postId}`, {
            method: 'DELETE',
        }).then(checkFavoriteByAPI())
    }
    const downloadFile = async (path, filename) => {
        setShowDownloadPopup(true)

        let uri = "https://c6.kemono.su/data" + path + "?f=" + filename
        console.log(uri)
        let targetLocation = FileSystem.documentDirectory + filename
        let downloadObject = FileSystem.createDownloadResumable(
            uri,
            targetLocation,
            {cache: true},
            process => {
                const percentProgress = process.totalBytesWritten / process.totalBytesExpectedToWrite
                console.log(percentProgress)
                setDownloadProcess(percentProgress)
            }
        )

        try {
            // Alert.alert("Downloading", downloadProcess)
            const result = await downloadObject.downloadAsync()
            saveFile(result.uri, filename, result.headers["content-type"])
        } catch (e) {
            Alert.alert("Fail", `File ${filename} download failed, error:\n${e}`)
            setDownloadProcess(0)
            setShowDownloadPopup(false)
        }
    }
    const saveFile = async (uri, filename, type) => {
        console.log("media type: " + type)

        if (Platform.OS === "android") {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

            if (permissions.granted){
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })

                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, type)
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 })
                        Alert.alert("Success", `File ${filename} download succeed\nSaved to: ${uri}`)
                    })
                    .catch(error => {
                        Alert.alert("Fail", `File ${filename} download failed, error:\n${error}`)
                        console.log(error)
                    })
                setShowDownloadPopup(false)
            }
        }
    }
    //endregion

    const checkIsFavorited = (favoritePosts) => {
        return favoritePosts.find((e) => e["id"] === postId) !== undefined
    }

    const CreaterInfo = () => {
        return <Block style={styles.artistInfoBlock}>
            <Block style={styles.artistInfoBlockHead}>
                <Image
                    style={styles.artistInfoBlockAvatarImage}
                    source={{uri: "https://img.kemono.su/icons/"+artistData["service"]+"/"+artistData["id"]}}
                />
                <Block style={styles.artistInfoBlockData}>
                    <Pressable onPress={() => {
                        navigation.navigate(
                            'ArtistDetailScreen',
                            {
                                artistId: artistData["id"],
                                service: artistData["service"]
                            }
                        )
                    }}>
                        <Text style={styles.artistInfoBlockName}>{artistData["name"]}</Text>
                    </Pressable>
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
            <Text style={styles.postInfoBlockPostPublished}>Published:    {postData["published"] !== undefined && postData["published"] !== null ? postData["published"].replace("T", " ") : ""}</Text>
            <Text style={styles.postInfoBlockPostEdited}>Edited:       {postData["edited"] !== undefined && postData["edited"] !== null ? postData["edited"].replace("T", " ") : ""}</Text>
            <Block style={styles.postInfoBlockPostBtnGroup}>
                <Button>Flagged</Button>
                {isFavoritedLoading ?
                    <Button><ActivityIndicator color="#fff" /></Button> :
                    isFavorited ?
                    <Button onPress={removeFavoritePost}>Unfavorite</Button> :
                    <Button onPress={addFavoritePost}>Favorite</Button>}
            </Block>
        </Block>
    }

    const PostContentAttachmentsImages = () => {
        if (postData["attachments"] === undefined){
            return null
        }

        let Images = postData["attachments"].map((attachment) => {
            if (isFileImage(attachment["name"])){
                return <Pressable onPress={() => setDetailImageUri(`https://c5.kemono.su/data${attachment["path"]}?f=${attachment["name"]}`)}>
                    <AutoAdjustHeightImage
                        styles={styles.postContentFileImage}
                        uri={`https://img.kemono.su/thumbnail/data/${attachment["path"]}`}
                    />
                </Pressable>
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

        let Videos = postData["attachments"].map((attachment, index) => {
            if (isFileVideo(attachment["name"])){
                const uri = `https://c5.kemono.su/data${attachment["path"]}`
                return <List.Accordion
                        id={attachment["name"]}
                        style={styles.videoAccordion}
                        titleStyle={styles.videoAccordionTitle}
                        theme={styles.videoAccordionGroupTheme}
                        title={attachment["name"]}
                        expanded={playingVideo === attachment["name"]}
                        onPress={e => console.log("press")}
                        onLongPress={(e) => {
                            console.log(attachment["name"])
                            setPlayingVideo(attachment["name"])
                        }}
                    >
                        <AutoAdjustVideoPlayer
                            uri={uri}
                            play={true}
                        />
                    </List.Accordion>
            }
        })

        if (Videos.length === 0){
            return null
        }

        return <Block>
            <Text style={[styles.postContentText, styles.postContentFile]}>Videos</Text>
            <List.AccordionGroup>
                {Videos}
            </List.AccordionGroup>

        </Block>
    }
    const PostContentAttachmentsFileDownloads = () => {
        if (postData["attachments"] === undefined){
            return null
        }

        let FileDownloads = postData["attachments"].map((attachment) => {
            return <Pressable onPress={() => {
                setDownloadProcess(0)
                downloadFile(attachment["path"], attachment["name"])
            }}>
                <Text style={styles.postContentFileDownloadsText}>{attachment["name"]}</Text>
            </Pressable>
        })

        if (FileDownloads.length === 0){
            return null
        }

        return <Block style={styles.postContentFileDownloadsBlock}>
            <Text style={[styles.postContentText, styles.postContentFile]}>Downloads</Text>
            {FileDownloads}
        </Block>
    }

    const PostContent = () => {

        return <Block style={styles.postContentBlock}>
            <Text style={[styles.postContentText, styles.postContentContent]}>Content</Text>
            <Text style={[styles.postContentText]}>{htmlCodeConvertor(postData["content"])}</Text>
            <PostContentAttachmentsFileDownloads />
            <Text style={[styles.postContentText, styles.postContentFile]}>Files</Text>
            {postData["file"] !== undefined && <AutoAdjustHeightImage styles={styles.postContentFileImage} uri={`https://img.kemono.su/thumbnail/data/${postData["file"]["path"]}`} />}
            <PostContentAttachmentsImages />
            <PostContentAttachmentsVideos />
        </Block>
    }
    const DownloadPopup = () => {
        return <Block style={styles.DownloadPopupMask}>
            <Block style={styles.DownloadPopupBlock}>
                <Text style={styles.DownloadPopupTitle}>Download File</Text>
                <CustomProgress loadProgress={downloadProcess} />
                <Button style={styles.DownloadPopupBtn} onPress={() => setShowDownloadPopup(false)}>
                    Close
                </Button>
            </Block>
        </Block>
    }

    useEffect(() => {
        getPostDetail()
    }, [postId, artistId, service]);
    useEffect(() => {
        if (favoritePosts === null){
            checkFavoriteByAPI()
        }
        else if (favoritePosts.length > 0){
            setIsFavorited(checkIsFavorited(favoritePosts))
        }
    }, [favoritePosts]);
    useEffect(() => {
        console.log("getting artist data")
        getArtistData()
    }, [artistId, service]);

    return <SafeAreaView style={GlobalStyles.container}>
        {isLoading && <CustomActivityIndicator />}
        {detailImageUri !== "" && <HDImageViewerPopup uri={detailImageUri} onClose={() => {setDetailImageUri("")}} />}
        {showDownloadPopup && <DownloadPopup />}
        {/*<VideoPlayerPopup />*/}
        <ScrollView>
            <CreaterInfo />
            {!isLoading && <PostInfo />}
            {!isLoading && <PostContent />}
        </ScrollView>
    </SafeAreaView>
}