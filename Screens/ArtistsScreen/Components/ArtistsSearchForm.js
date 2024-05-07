import {Block, Input} from "galio-framework";
import {StyleSheet} from "react-native";

export default function ({
    name, onNameChange,
    service, onServiceChange,
    sortBy, onSortByChange,
    sort, onSortChange
                         }){

    const styles = StyleSheet.create({
        Container: {
            width: '100%',
        },
        Form: {
            width: '90%',
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 20,
            padding: 10,
            backgroundColor: "#282a2e"
        },
        FormRow: {
            flexDirection: "row",
        },
        FormText: {
            color: "#f2f2f2",
            flex: 1,
            alignSelf: "center"
        },
    })

    const data = [
        { title: "First Chapter", content: "Lorem ipsum dolor sit amet",
            icon: {
                name: 'keyboard-arrow-up',
                family: 'material',
                size: 16,
            }
        },
        { title: "2nd Chapter", content: "Lorem ipsum dolor sit amet" },
        { title: "3rd Chapter", content: "Lorem ipsum dolor sit amet" }
    ];

    return (
        <Block style={styles.Container}>
            <Block style={styles.Form}>
                <Input
                    placeholder={"Name"}
                    value={name}
                    onChangeText={text => onNameChange(text)}
                />
            </Block>
        </Block>
    )
}