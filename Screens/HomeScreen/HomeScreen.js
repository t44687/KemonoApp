import {Block, Button, Text} from "galio-framework";
import {Alert, View} from "react-native";
import GlobalStyles from "../../Style/GlobalStyles";
import {log} from "expo/build/devtools/logger";

export default function HomeScreen({navigation}){
    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.text}>Welcome to Kemono App</Text>
            <Button
                onPress={() => Alert.alert('Test','Login')}
            >Login</Button>
        </View>
    )
}