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
        marginTop: 10,
        width: 120,
        height: 120,
        resizeMode: 'stretch',
        zIndex: 2,
        borderRadius: 5
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
    artistInfoBlockName: {
        marginLeft: 10,
        color: "#ffbb99",
        fontSize: 20,
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
    },

    // postInfo
    postInfoBlock: {
        width: "100%",
        padding: 10,
        backgroundColor: "#3b3e44"
    },
    postInfoBlockPostName: {
        marginTop: 5,
        marginBottom: 20,
        color: "#f2f2f2",
        fontSize: 32,
        fontWeight: "normal"
    },
    postInfoBlockPostPublished: {
        color: "#b3b3b3",
    },
    postInfoBlockPostEdited: {
        color: "#b3b3b3",
    },
    postInfoBlockPostImported: {
        color: "#b3b3b3",
    },
    postInfoBlockPostBtnGroup: {
        width: "100%",
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: "flex-start"
    },

    // postContent
    postContentBlock: {
        width: "100%",
        padding: 10,
    },
    postContentText: {
        color: "#f2f2f2",
    },
    postContentContent: {
        fontSize: 24,
    },
    postContentFile: {
        fontSize: 24,
    },
    postContentFileImage: {
        marginTop: 5,
        marginBottom: 10
    },

    postContentFileDownloadsBlock: {
        width: "100%",
        marginTop: 10,
        marginBottom: 10
    },
    postContentFileDownloadsText: {
        padding: 5,
        color: "#7db2e8"
    },

    DownloadPopupBlock: {
        width: "70%",
        aspectRatio: 1,
        alignSelf: "center",
        top: "30%",
        backgroundColor: "#282a2e",
        borderColor: "#737373",
        borderStyle: "solid",
        borderRadius: 5,
        borderWidth: 1
    },
    DownloadPopupMask: {
        position: "absolute",
        zIndex: 2,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    DownloadPopupTitle: {
        color: "#f2f2f2",
        fontSize: 24,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    DownloadPopupText: {
        color: "#f2f2f2",
        fontSize: 16,
        textAlign: "center",
    },
    DownloadPopupBtn: {
        alignSelf: "center",
        marginTop: 50
    }
});