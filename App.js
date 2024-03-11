import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import { Block, Button, Card, Icon, Input, NavBar, Text } from 'galio-framework';
import KemonoNavBar from "./Component/KemonoNavBar";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import React from "react";
import ArtistsScreen from "./Screens/ArtistsScreen/ArtistsScreen";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



export default function App() {
  return (
      <NavigationContainer>
          <Drawer.Navigator>
              <Drawer.Screen
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
              <Drawer.Screen
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
              <Drawer.Screen
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
          </Drawer.Navigator>
      </NavigationContainer>
  );
}