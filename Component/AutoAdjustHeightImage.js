import React, { useState, useEffect } from 'react';
import { Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const AutoAdjustHeightImage = ({uri, styles}) => {
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        Image.getSize(uri, (width, height) => {
            setAspectRatio(width / height);
        });
    }, [uri]);

    return (
        <Image
            style={[{
                width: windowWidth,
                height: undefined,
                aspectRatio,
            }, styles]}
            source={{ uri: uri }}
        />
    );
};

export default AutoAdjustHeightImage;
