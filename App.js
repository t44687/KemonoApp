import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import { Block, Button, Card, Icon, Input, NavBar, Text } from 'galio-framework';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!</Text>
      <StatusBar style="auto" />
      <Button>Hi</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

