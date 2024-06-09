import {Block, Button, Icon, NavBar, Text, theme} from "galio-framework";
import {FlatList, Pressable, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {useContext} from "react";
import {useAuth} from "../Context/AuthContext";

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

const getLoginState = () => {
    const { isAuth, _ } = useAuth()
    if (isAuth === null)
        return false
    return isAuth
}

const NavbarRenderItem = ({item, navigation}) => {
    return <Block flex style={styles.navbarItem}>
        <Pressable onPress={() => navigation.navigate(item.navigate)}>
            <Text style={styles.navbarText}>
                {item.text}
            </Text>
        </Pressable>
    </Block>
}

const NavBarContent = ({navigation}) => {
    const navBarData = [
        {navigate: 'Artists', text: 'Artists'},
        {navigate: 'Posts', text: 'Posts'},
        // {navigate: '4', text: 'Import'},
        getLoginState() && {navigate: 'FavoriteScreen', text: 'Favorites'},
        getLoginState() ?
            {navigate: 'Login', text: 'Logout'} :
            {navigate: 'Login', text: 'Login'},
    ]

    return <FlatList
        horizontal
        data={navBarData}
        renderItem={(props) =>
            <NavbarRenderItem
                item={props.item}
                navigation={navigation}
            />
    }
    />
}

export default function KemonoNavBar(){
    const navigation = useNavigation()

    return <Block style={styles.navbar}>
        <NavBarContent navigation={navigation} />
    </Block>
}