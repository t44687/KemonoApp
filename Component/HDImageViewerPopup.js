import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {Block} from "galio-framework";
import CustomProgress from "./CustomProgress";
import {VideoFullscreenUpdate} from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

const HDImageViewerPopup = ({uri, styles, onClose}) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    const [imageWidth, setImageWidth] = useState(0)
    const [imageHeight, setImageHeight] = useState(0)
    const [onLoad, setOnLoad] = useState(0)
    const [loadProgress, setLoadProgress] = useState(1)

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
            justifyContent: 'center',
            alignItems: 'center',
        },
        Image: {
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

    const handleOrientation = async (unlock) => {
        if (unlock)
            await ScreenOrientation.unlockAsync()
        else
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT,)
    }

    useEffect(() => {
        handleOrientation(true)
    }, []);
    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            setAspectRatio(width / height);
            setImageWidth(width)
            setImageHeight(height)
        });
    }, [uri]);

    return (
        <Pressable style={predefinedStyles.Mask} onPress={() => {
            handleOrientation(false)
            onClose()
        }}>
            <Block style={predefinedStyles.ImageContainer}>
                {loadProgress !== 1 &&
                        <CustomProgress
                            loadProgress={loadProgress}
                        />
                }
                <Image
                    style={[predefinedStyles.Image, styles]}
                    source={{ uri: uri }}
                    progressiveRenderingEnabled
                    onLoadStart={() => {
                        setLoadProgress(0)
                        setOnLoad(true)
                    }}
                    resizeMode={"center"}
                    onLoadEnd={() => setOnLoad(false)}
                    onProgress={event => {
                        setLoadProgress(event["nativeEvent"]["loaded"]/event["nativeEvent"]["total"])
                    }}
                />
            </Block>
        </Pressable>
    );
};

export default HDImageViewerPopup;
