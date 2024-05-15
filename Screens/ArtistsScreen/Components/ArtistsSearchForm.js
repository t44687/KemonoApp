import {Block, Input, Accordion} from "galio-framework";
import {StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

export default function ({
    name, onNameChange,
    service, onServiceChange,
    sortBy, onSortByChange,
    order, onOrderChange
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
        FormInput: {
            backgroundColor: "#f2f2f2",
            borderRadius: 7,
            height: 40,
        },
        FormDropdown: {
            backgroundColor: "#f2f2f2",
            borderRadius: 7,
            height: 40,
            padding: 15,
            marginBottom: 10
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
    const sortByList = [
        { label: 'Popularity', value: 'favorited'},
        { label: 'Date Indexed', value: 'indexed'},
        { label: 'Date Updated', value: 'updated'},
        { label: 'Alphabetical Order', value: 'name'},
        { label: 'Service', value: 'service'},
    ]
    const orderList = [
        { label: 'Descending', value: 0},
        { label: 'Ascending', value: 1}
    ]

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
                <Dropdown
                    style={styles.FormDropdown}
                    data={sortByList}
                    placeholderStyle={styles.FormDropdownText}
                    placeholder={'Sort by'}
                    labelField='label'
                    valueField='value'
                    value={sortBy}
                    onChange={item => {
                        onSortByChange(item.value)
                    }}
                />
                <Dropdown
                    style={styles.FormDropdown}
                    data={orderList}
                    placeholderStyle={styles.FormDropdownText}
                    placeholder={'Order'}
                    labelField='label'
                    valueField='value'
                    value={order}
                    onChange={item => {
                        onOrderChange(item.value)
                    }}
                />
            </Block>
        </Block>
    )
}