export function htmlCodeConvertor (htmlCode){

    if (htmlCode === undefined){
        return ""
    }
    let convertedMsg = htmlCode

    convertedMsg = convertedMsg.replace(/<p>/g, "\n")
    convertedMsg = convertedMsg.replace(/<\/p>/g, "\n")
    convertedMsg = convertedMsg.replace(/<br\/>/g, "\n")
    convertedMsg = convertedMsg.replace(/<a href='([^"]*)'>/g, "")
    convertedMsg = convertedMsg.replace(/<\/a>/g, "")

    return convertedMsg
}