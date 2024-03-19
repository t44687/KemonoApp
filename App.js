
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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                      headerStyle: {
                          backgroundColor: '#282a2e',
                      },
                      headerTitle: (props) =>
                          <KemonoNavBar />
                  }}
              />
              <Stack.Screen
                  name="Artists"
                  component={ArtistsScreen}
                  options={{
                      headerStyle: {
                          backgroundColor: '#282a2e',
                      },
                      headerTitle: (props) =>
                          <KemonoNavBar />
                  }}
                  initialParams={{'startIndex': 0}}
              />
              <Stack.Screen
                  name="Posts"
                  component={PostsScreen}
                  options={{
                      headerStyle: {
                          backgroundColor: '#282a2e',
                      },
                      headerTitle: (props) =>
                          <KemonoNavBar />
                  }}
              />
              <Stack.Screen
                  name="ArtistDetailScreen"
                  component={ArtistDetailScreen}
                  options={{
                      unmountOnBlur: true,
                      drawerItemStyle: { display: 'none' }, // hidden it in slide menu
                      headerStyle: {
                          backgroundColor: '#282a2e',
                      },
                      headerTitle: (props) =>
                          <KemonoNavBar />
                  }}
              />
              <Stack.Screen
                  name="PostDetailScreen"
                  component={PostDetailScreen}
                  options={{
                      unmountOnBlur: true,
                      drawerItemStyle: { display: 'none' }, // hidden it in slide menu
                      headerStyle: {
                          backgroundColor: '#282a2e',
                      },
                      headerTitle: (props) =>
                          <KemonoNavBar />
                  }}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}