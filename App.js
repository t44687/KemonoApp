import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import { Block, Button, Card, Icon, Input, NavBar, Text } from 'galio-framework';
import KemonoNavBar from "./assets/Component/KemonoNavBar";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from "./assets/Page/HomePage";
import React from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1F20',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        color: '#fff'
    }
});

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



export default function App() {
  return (
      <NavigationContainer>
          <Drawer.Navigator>
              <Drawer.Screen
                  name="Home"
                  component={HomePage}
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