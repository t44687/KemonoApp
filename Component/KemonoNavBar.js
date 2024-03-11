import {Block, Button, Icon, NavBar, Text, theme} from "galio-framework";
import {FlatList, StyleSheet} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const styles = StyleSheet.create({
    navbar: {
        alignItems: "flex-start",
        width: "100%"
    },
    navbarText: {
        color: '#e8a17d',
    },
    navbarItem: {
        paddingHorizontal: 4,
        justifyContent: "center"
    }
});

const navBarData = [
    {navigate: '1', text: 'Home'},
    {navigate: '2', text: 'Artists'},
    {navigate: '3', text: 'Posts'},
    {navigate: '4', text: 'Import'},
    {navigate: '5', text: 'Favorites'},
    {navigate: '6', text: 'Logout'},
]

const navbarRenderItem = ({item}) => {
    return <Block flex style={styles.navbarItem}>
        <Text style={styles.navbarText}>
            {item.text}
        </Text>
    </Block>
}

const NavBarContent = () => {
    return <FlatList
        horizontal
        data={navBarData}
        renderItem={navbarRenderItem}
    />
}

const Drawer = createDrawerNavigator()

export default function KemonoNavBar(){
    return <Block style={styles.navbar}>
        <NavBarContent />
    </Block>
}