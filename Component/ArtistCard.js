import {Alert, Pressable} from "react-native";
import {Card} from "galio-framework";
import styles from "../Screens/ArtistsScreen/Styles/ArtistsScreenStyles";
import {PureComponent} from "react";

class ArtistCard extends PureComponent {
    render(){
        return (
            <Pressable onPress={() => Alert.alert('test', this.props.id)}>
                <Card
                    flex
                    style={styles.card}
                    titleColor={'#fff'}
                    title={this.props.name}
                    caption={this.props.favorited + " favorited"}
                    image={"https://img.kemono.su/banners/"+this.props.service+"/"+this.props.id}
                    avatar={"https://img.kemono.su/icons/"+this.props.service+"/"+this.props.id}
                />
            </Pressable>
        )
    }
}

export default function ({id, name, favorited, service}){
    return <ArtistCard
        id={id}
        name={name}
        favorited={favorited}
        service={service}
    />
}