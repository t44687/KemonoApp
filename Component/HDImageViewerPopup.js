import React, { useState, useEffect } from 'react';
import {Image, Dimensions, StyleSheet, ScrollView, Pressable, PixelRatio} from 'react-native';
import {Block, Button, Slider} from "galio-framework";
import * as Progress from 'react-native-progress'
import CustomProgress from "./CustomProgress";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HDImageViewerPopup = ({uri, styles, onClose}) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    const [imageTop, setImageTop] = useState(0)
    const [imageRight, setImageRight] = useState(0)
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

    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            setAspectRatio(width / height);
            setImageWidth(width)
            setImageHeight(height)
        });
    }, [uri]);

    return (
        <Pressable style={predefinedStyles.Mask} onPress={() => onClose()}>
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
