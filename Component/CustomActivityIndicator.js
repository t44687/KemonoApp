import {ActivityIndicator, StyleSheet, View} from "react-native";
import {Block} from "galio-framework";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 2,
        justifyContent: 'center',
        width: "100%",
        height: "100%",
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    Mask: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    indicator: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default function ({enableMask=true, size='large', color}){
    let styleList = [styles.container, styles.horizontal]
    if (enableMask){
        styleList.push(styles.Mask)
    }

    return <View style={styleList}>
        <ActivityIndicator
            size={size}
            color={color}
        />
    </View>
}