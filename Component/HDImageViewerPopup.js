import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {Block} from "galio-framework";
import CustomProgress from "./CustomProgress";

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
        ImagePortrait: {
            width: "100%",
            height: undefined,
            aspectRatio,
        },
        ImageLandscape: {
            width: undefined,
            height: "100%",
            aspectRatio,
            transform: [{rotate: '90deg'}]
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

    const setImageRotation = (aspectRatio) => {
        if (aspectRatio > 1)
            return predefinedStyles.ImageLandscape
        else
            return predefinedStyles.ImagePortrait
    }

    return (
        <Pressable style={predefinedStyles.Mask} onPress={() => onClose()}>
            <Block style={predefinedStyles.ImageContainer}>
                {loadProgress !== 1 &&
                        <CustomProgress
                            loadProgress={loadProgress}
                        />
                }
                <Image
                    style={[setImageRotation(aspectRatio), styles]}
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
