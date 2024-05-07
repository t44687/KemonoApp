import {Block, Button, Text} from "galio-framework";
import {FlatList, Pressable, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";

const styles = StyleSheet.create({
    flatList: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    prevOrNextBtnList:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    prevOrNextBtn: {
        padding: 0,
        margin: 0
    },
    button: {
        width: 40,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 0,
        borderColor: '#737373',
        backgroundColor: '#1D1F20',
    },
    button_hover: {
        backgroundColor: "#737373"
    },
    currentPageBtn: {
        backgroundColor: "#663300",
        borderColorL: "#ffbb99"
    },
    currentPageText: {
        color: "#e8a17d",
    },
    pageText: {
        color: "white"
    },
});

export default function Pagination({currentPage, total, maxPageShown, onPageChange}){
    const [pageList, setPageList] = useState([])

    useEffect(() => {
        generatePageList()
    }, [currentPage, total]);

    const havePreviousPage = () => {
        return currentPage > 1
    }
    const haveNextPage = () => {
        const remainPages = Math.ceil(total/50)
        return currentPage !== remainPages && remainPages > 0
    }

    const generatePageList = () => {
        let tempList = []
        tempList.push(
            {page: currentPage}
        )

        let iteration = 1
        while (tempList.length < maxPageShown && haveNextPage()){
            if (havePreviousPage() && currentPage-iteration > 0){
                tempList.unshift(
                    {page: currentPage-iteration}
                )
            }
            if (haveNextPage()){
                tempList.push(
                    {page: currentPage+iteration}
                )
            }
            iteration++
        }
        setPageList(tempList)
    }

    const PageButton = ({item, navigation}) => {
        let isCurrentPage = item.page === currentPage

        return <Block>
            <Pressable
                onPress={()=> onPageChange(item.page)}
                style={isCurrentPage ? [styles.button, styles.currentPageBtn] : styles.button}
            >
                <Text style={isCurrentPage ? styles.currentPageText : styles.pageText}>
                    {item.page}
                </Text>
            </Pressable>
        </Block>
    }

    const PreviousPageBtn = () => {
        return <View style={styles.prevOrNextBtnList}>
            <Button
                onPress={()=> onPageChange(1)}
                style={[styles.button, styles.prevOrNextBtn]}
            >{"<<"}</Button>
            <Button
                onPress={()=> onPageChange(currentPage-1)}
                style={[styles.button, styles.prevOrNextBtn]}
            >{"<"}</Button>
        </View>
    }
    const NextPageBtn = () => {
        return <View style={styles.prevOrNextBtnList}>
            <Button
                onPress={()=> onPageChange(currentPage+1)}
                style={[styles.button, styles.prevOrNextBtn]}
            >{">"}</Button><Button
            onPress={()=> onPageChange(Math.ceil(total/50))}
            style={[styles.button, styles.prevOrNextBtn]}
        >{">>"}</Button>
        </View>
    }

    return (
     <Block>
         <FlatList
             horizontal
             contentContainerStyle={styles.flatList}
             data={pageList}
             ListHeaderComponent={havePreviousPage() ? <PreviousPageBtn /> : null}
             ListFooterComponent={haveNextPage() ? <NextPageBtn /> : null}
             renderItem={(props) =>
                 (<PageButton
                     item={props.item}
                 />)
             }
         />
     </Block>
    )
}