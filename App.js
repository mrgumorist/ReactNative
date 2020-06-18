import * as React from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Provider} from 'react-redux';
import Main from './src/components/main';
import Register from './src/components/register';
import Tasks from './src/components/tasks';
import Card from './src/components/Card'
import AddNew from './src/components/AddNew'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

const Stack = createStackNavigator();
export default class App extends React.Component {
	 
	render(){
		return (
		<NavigationContainer>
		
     	 <Stack.Navigator initialRouteName="Main" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Register" component={Register} />
		<Stack.Screen name="Tasks" component={Tasks} />
		<Stack.Screen name="AddNew" component={AddNew}/>
		<Stack.Screen name="Card" component={Card} />
      	</Stack.Navigator>
    	</NavigationContainer>
		)
	}
	
}
  

