import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        width: "100%"
    },
    artistInfoBlock: {
        width: "100%",
        height: 200
    },
    artistInfoBlockImage: {
        flex: 1,
        backgroundColor: 'transparent',
        opacity: 0.2
    },
    artistInfoBlockHead: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
    },
    artistInfoBlockAvatarImage: {
        width: 120,
        height: 120,
        resizeMode: 'stretch',
        zIndex: 2
    },
    artistInfoBlockData: {
        flex: 1,
        zIndex: 2,
        flexDirection: 'row',
        padding: 10,
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: "center",
    },
    artistInfoBlockServiceImage: {
        flex: 1,
        height: 35,
        resizeMode: "center"
    },
    artistInfoBlockName: {
        flex: 9,
        marginLeft: 10,
        color: "#99ddff",
        fontSize: 24,
        fontWeight: "bold"
    },

    artistPostPagin: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    artistPostPaginBtn: {
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 0,
        borderColor: '#737373',
        backgroundColor: '#1D1F20',
    }
});