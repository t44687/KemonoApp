import {Block, Input, Accordion} from "galio-framework";
import {StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

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
        FormInput: {
            backgroundColor: "#f2f2f2",
            borderRadius: 7,
            height: 40,
        },
        FormDropdown: {
            backgroundColor: "#f2f2f2",
            borderRadius: 7,
            height: 40,
            padding: 15
        },
        FormDropdownText: {
            color: "#282a2e",
        }
    })

    const serviceList = [
        { label: 'All', value: ''},
        { label: 'Patreon', value: 'patreon'},
        { label: 'Pixiv Fanbox', value: 'fanbox'},
        { label: 'Discord', value: 'discord'},
        { label: 'Fantia', value: 'fantia'},
        { label: 'Afdian', value: 'afdian'},
        { label: 'Boosty', value: 'boosty'},
        { label: 'DLsite', value: 'dlsite'},
        { label: 'Gumroad', value: 'gumroad'},
        { label: 'SubscribeStar', value: 'subscribestar'},
    ];

    return (
        <Block style={styles.Container}>
            <Block style={styles.Form}>
                <Input
                    borderless
                    style={styles.FormInput}
                    placeholder={"Name"}
                    value={name}
                    onChangeText={text => onNameChange(text)}
                />
                <Dropdown
                    style={styles.FormDropdown}
                    data={serviceList}
                    placeholderStyle={styles.FormDropdownText}
                    placeholder={'Service'}
                    labelField="label"
                    valueField="value"
                    value={service}
                    onChange={item => {
                        onServiceChange(item.value)
                    }}
                />
            </Block>
        </Block>
    )
}