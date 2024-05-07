import {Alert, Pressable} from "react-native";
import {Card} from "galio-framework";
import styles from "../Screens/ArtistsScreen/Styles/ArtistsScreenStyles";
import {PureComponent} from "react";
import {useNavigation} from "@react-navigation/native";

class ArtistCard extends PureComponent {

    render(){
        const {id, name, favorited, service, onClick} = this.props

        return (
            <Pressable key={id} onPress={() => onClick(id, service)}>
                <Card
                    flex
                    style={styles.card}
                    titleColor={'#fff'}
                    title={name}
                    caption={favorited + " favorited"}
                    image={"https://img.kemono.su/banners/"+service+"/"+id}
                    avatar={"https://img.kemono.su/icons/"+service+"/"+id}
                />
            </Pressable>
        )
    }
}

export default function ({id, name, favorited, service, onClick}){
    return <ArtistCard
        key={id}
        id={id}
        name={name}
        favorited={favorited}
        service={service}
        onClick={onClick}
    />
}