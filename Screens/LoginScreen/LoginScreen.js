import WebView from "react-native-webview";
import {StyleSheet} from "react-native";
import {Block, Button, Input, Text} from "galio-framework";
import globalStyles from "../../Style/GlobalStyles";
import GlobalStyles from "../../Style/GlobalStyles";
import {useEffect, useState} from "react";
import CustomActivityIndicator from "../../Component/CustomActivityIndicator";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
    Title: {
        fontSize: 40,
    },
    LoginForm: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 20,
    },
    FormInput: {
        backgroundColor: "#f2f2f2",
        borderRadius: 7,
        height: 40,
    },
    FormButton: {
        width: "100%",
        color: "#fff",
        backgroundColor: "#32373e",
    }
});

export default function LoginScreen() {
    const navigation = useNavigation()
    
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const getSession = function(headers) {
        for (const [name, value] of headers) {
            if (name === "age" && value > 0) {
                navigation.navigate("Artists")
                break
            }
        }
    }
    const login = () => {
        setIsLoading(true)
        let formdata = new FormData()
        formdata.append("location", "")
        formdata.append("username", username)
        formdata.append("password", password)
        
        fetch('https://kemono.su/account/login', {
            method: 'post',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then(response => getSession(response.headers))
            .then(() => setIsLoading(false))
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        login() // try login (can't check httpOnly cookie)
    }, []);
    
    return (
        <Block style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator />}
            <Text style={[GlobalStyles.text, styles.Title]}>Login</Text>
            <Text style={[GlobalStyles.text]}>Don't have an account? Register!</Text>
            <Text style={[GlobalStyles.text]}>Your favorites will automatically be saved</Text>
            
            <Block style={styles.LoginForm}>
                <Input
                    borderless
                    style={styles.FormInput}
                    placeholder={"Username"}
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <Input
                    borderless
                    style={styles.FormInput}
                    placeholder={"Password"}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    password={true}
                />
                <Button 
                    style={styles.FormButton} 
                    onPress={login}
                >Login</Button>
            </Block>
        </Block>
    )
}