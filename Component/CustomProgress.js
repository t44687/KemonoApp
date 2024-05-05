import * as Progress from "react-native-progress";
import {StyleSheet} from "react-native";
import {Block} from "galio-framework";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default function ({loadProgress}){
    return <Block style={styles.container}>
        <Progress.Circle
            progress={loadProgress}
            size={100}
            thickness={5}
            color={"#e8a17d"}
            animated
            showsText
        />
    </Block>
}