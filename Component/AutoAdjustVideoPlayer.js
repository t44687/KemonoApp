import {Image, Pressable, StyleSheet, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {ResizeMode, Video, VideoFullscreenUpdate} from "expo-av";
import * as ScreenOrientation from 'expo-screen-orientation';


export const AutoAdjustVideoPlayer = ({uri, play}) => {
    const video = useRef(null);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [videoOrientation, setVideoOrientation] = useState("landscape")

    const predefinedStyles = StyleSheet.create({
        Mask: {
            position: "absolute",
            zIndex: 2,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(0, 0, 0, 0.9)'
        },
        closeMask: {
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            height: "100%",
        },
        ImageContainer: {
            width: "100%",
            height: "100%",
        },
        Video: {
            backgroundColor: '#000000',
            width: "100%",
            height: undefined,
            aspectRatio,
        },
        CloseBtn: {
            position: "absolute",
            bottom: 50,
            alignSelf: "center",

        }
    })

    const onFullscreenUpdate = async ({fullscreenUpdate}) => {
        if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_PRESENT)
            await ScreenOrientation.unlockAsync()
        else if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT,)
    };

    const adjustSize = (width, height) => {
        setAspectRatio(width / height);
    }

    useEffect(() => {
        console.log(play)
        if (play){
            console.log(uri)
            video.current.loadAsync({
                uri: uri
            })
        }
    }, []);

    return <Video
        ref={video}
        style={predefinedStyles.Video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isMuted={false}
        shouldPlay={false}
        shouldCorrectPitch={false}
        onReadyForDisplay={event => adjustSize(event.naturalSize.width, event.naturalSize.height)}
        onFullscreenUpdate={onFullscreenUpdate}
        onError={error => console.error(error)}
    />
}