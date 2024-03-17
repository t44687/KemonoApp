import {PureComponent} from "react";
import {Alert, Pressable, StyleSheet} from "react-native";
import {Block, Card, Text} from "galio-framework";

class PostCard extends PureComponent{
    render() {
        const styles = StyleSheet.create({
            titleBlock: {
                position: "absolute",
                zIndex: 2,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                paddingLeft: 30,
                paddingRight: 30,
                height: 50,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: "center"
            },
            title: {
                color: "white"
            },
            card: {
                margin: 15
            }
        });

        const {id, title, published, attachmentsLength, service, user, filePath, onClick} = this.props

        return <Pressable onPress={() => onClick(id)}>
            <Block style={styles.titleBlock}>
                <Text style={styles.title}>{title}</Text>
            </Block>
            <Card
                flex
                style={styles.card}
                titleColor={'#fff'}
                title={published.replace('T',' ')}
                caption={attachmentsLength + " attachments"}
                avatar={"https://img.kemono.su/banners/"+service+"/"+user}
                image={"https://img.kemono.su/thumbnail/data/"+filePath}
            />
        </Pressable>
    }
}

export default function ({id, title, published, attachmentsLength, service, user, filePath, onClick}){
    return <PostCard
        id={id}
        title={title}
        published={published}
        attachmentsLength={attachmentsLength}
        service={service}
        user={user}
        filePath={filePath}
        onClick={onClick}
    />
}