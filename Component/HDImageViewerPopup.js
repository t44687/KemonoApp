import React, { useState, useEffect } from 'react';
import {Image, Dimensions, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Block, Button} from "galio-framework";

const windowWidth = Dimensions.get('window').width;

const HDImageViewerPopup = ({uri, styles, onClose}) => {
    const [aspectRatio, setAspectRatio] = useState(1);

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
            <Image
                style={[predefinedStyles.Image, styles]}
                source={{ uri: uri }}
                progressiveRenderingEnabled
            />
            <Button onPress={onClose}>Close</Button>
        </Block>
    );
};

export default HDImageViewerPopup;
