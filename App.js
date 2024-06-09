
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from "react";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import KemonoNavBar from "./Component/KemonoNavBar";
import ArtistsScreen from "./Screens/ArtistsScreen/ArtistsScreen";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";
import ArtistDetailScreen from "./Screens/ArtistDetailScreen/ArtistDetailScreen";
import PostDetailScreen from "./Screens/PostDetailScreen/PostDetailScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import FavoriteScreen from "./Screens/FavoriteScreen/FavoriteScreen";
import {AuthProvider} from "./Context/AuthContext";

const Stack = createNativeStackNavigator();


function Navigation(props) {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#282a2e",
                    },
                    headerTitle: props.headerTitle
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#282a2e",
                    },
                    headerTitle: props.headerTitle
                }}
            />
            <Stack.Screen
                name="Artists"
                component={ArtistsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#282a2e",
                    },
                    headerTitle: props.headerTitle
                }}
                initialParams={{"startIndex": 0}}
            />
            <Stack.Screen
                name="Posts"
                component={PostsScreen}
                options={{
                    headerStyle: {
                        backgroundColor: "#282a2e",
                    },
                    headerTitle: props.headerTitle
                }}
            />
            <Stack.Screen
                name="ArtistDetailScreen"
                component={ArtistDetailScreen}
                options={{
                    unmountOnBlur: true,
                    drawerItemStyle: {display: "none"}, // hidden it in slide menu
                    headerStyle: {
                        backgroundColor: "#282a2e",
                    },
                    headerTitle: props.headerTitle
                }}
            />
            <Stack.Screen
                name="PostDetailScreen"
                component={PostDetailScreen}
                options={{
                    unmountOnBlur: true,
                    drawerItemStyle: {display: "none"}, // hidden it in slide menu
                    headerStyle: {
                        backgroundColor: "#282a2e",
                    },
                    headerTitle: props.headerTitle
                }}
            />
            <Stack.Screen
                name="FavoriteScreen"
                component={FavoriteScreen}
                options={{
                    unmountOnBlur: true,
                    drawerItemStyle: {display: "none"}, // hidden it in slide menu
                    headerStyle: {
                        backgroundColor: "#282a2e",
                    },
                    headerTitle: props.headerTitle
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>;
}

export default function App() {
  return (
      <AuthProvider>
          <Navigation
              headerTitle={(props) => <KemonoNavBar/>}
          />
      </AuthProvider>

  );
}