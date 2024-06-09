import {StyleSheet} from "react-native";
import {Block, Input} from "galio-framework";
import {Dropdown} from "react-native-element-dropdown";

export default function ({
    type, onTypeChange,
    sortBy, onSortByChange,
    order, onOrderChange}) {

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
    
    const typeList = [
        { label: 'Artists', value: 'artist'},
        { label: 'Posts', value: 'post'},
    ]
    const artistsSortByList = [
        { label: 'New post date', value: 'updated_timestamp'},
        { label: 'Faved date', value: 'faved_seq'},
        { label: 'Reimported date', value: 'last_imported_timestamp'}
    ]
    const postsSortByList = [
        { label: 'Faved date', value: 'faved_seq'},
        { label: 'Published', value: 'published_timestamp'}
    ]
    const orderList = [
        { label: 'Descending', value: 0},
        { label: 'Ascending', value: 1}
    ]

    return (
        <Block style={styles.Container}>
            <Block style={styles.Form}>
                <Dropdown
                    style={styles.FormDropdown}
                    data={typeList}
                    placeholderStyle={styles.FormDropdownText}
                    placeholder={'Type'}
                    labelField='label'
                    valueField='value'
                    value={type}
                    onChange={item => {
                        onTypeChange(item.value)
                    }}
                />
                <Dropdown
                    style={styles.FormDropdown}
                    data={type === "artist" ? artistsSortByList : postsSortByList}
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