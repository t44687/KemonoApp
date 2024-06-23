import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from "react-native";

export function htmlCodeConvertor (htmlCode){
    const { width } = useWindowDimensions();

    if (htmlCode === undefined){
        return ""
    }

    const tagsStyles = {
        body: {
            color: 'white'
        },
        a: {
            color: 'blue'
        }
    };

    let filteredHtmlCode = htmlCode
    // remove a tag
    // filteredHtmlCode = htmlCode.replace(/<\/a>/g, '')
    // filteredHtmlCode = filteredHtmlCode.replace(/<a[^>]*>/g, '')
    filteredHtmlCode = filteredHtmlCode.replace(/<img[^>]*>/g, '') // remove img tab
    filteredHtmlCode = filteredHtmlCode.replace(/<br\s*\/?>/g, '') // remove br tag
    filteredHtmlCode = filteredHtmlCode.replace(/<p>\s*<\/p>/g, '') // remove empty paragraph

    console.log(filteredHtmlCode)

    return <RenderHtml
        contentWidth={width}
        source={{html: filteredHtmlCode}}
        tagsStyles={tagsStyles}
    />
    // convertedMsg = convertedMsg.replace(/<p>/g, "\n")
    // convertedMsg = convertedMsg.replace(/<\/p>/g, "\n")
    // convertedMsg = convertedMsg.replace(/<br\/>/g, "\n\r")
    // convertedMsg = convertedMsg.replace(/<br>/g, "\n\r")
    // convertedMsg = convertedMsg.replace(/<a href='([^"]*)'>/g, "")
    // convertedMsg = convertedMsg.replace(/<\/a>/g, "")
    //
    // return convertedMsg
}