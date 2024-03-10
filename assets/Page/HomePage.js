import {Block, Button, Text} from "galio-framework";
import {View} from "react-native";

export default function HomePage({navigation}){
    return (
        <View>
            <Text>Welcome to Kemono App</Text>
            <Button
                onPress={() => navigation.goBack()}
            >Back</Button>
        </View>
    )
}