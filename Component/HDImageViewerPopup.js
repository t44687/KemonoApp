import React, { useState, useEffect } from 'react';
import {Image, Dimensions, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Block, Button, Slider} from "galio-framework";
import * as Progress from 'react-native-progress'
import CustomProgress from "./CustomProgress";

const windowWidth = Dimensions.get('window').width;

const HDImageViewerPopup = ({uri, styles, onClose}) => {
    const [aspectRatio, setAspectRatio] = useState(1);
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
        Image: {
            width: windowWidth,
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
        console.log("123")
        Image.getSize(uri, (width, height) => {
            setAspectRatio(width / height);
        });
    }, [uri]);

    return (
        <Block style={predefinedStyles.Mask}>
            {loadProgress !== 1 && <CustomProgress
                loadProgress={loadProgress}
            />}
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
            <Button style={predefinedStyles.CloseBtn} onPress={onClose}>Close</Button>
        </Block>
    );
};

export default HDImageViewerPopup;
