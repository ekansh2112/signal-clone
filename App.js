import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChat from "./screens/AddChat";
import ChatScreen from "./screens/ChatScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
	headerStyle: {
		backgroundColor: "#008080",
	},
	headerTitleStyle: {
		color: "white",

		// paddingRight: "50%",
	},
	headerTinColor: "white",
	headerTitleAlign: "center",
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={globalScreenOptions}>
				<Stack.Screen
					options={{
						title: "Login",
					}}
					name='Login'
					component={LoginScreen}
				/>
				<Stack.Screen
					options={{
						title: "Register",
					}}
					name='Register'
					component={RegisterScreen}
				/>
				<Stack.Screen
					options={{
						title: "Home",
					}}
					name='Home'
					component={HomeScreen}
				/>
				<Stack.Screen
					options={{
						title: "Add Chat",
					}}
					name='AddChat'
					component={AddChat}
				/>
				<Stack.Screen
					options={{
						title: "Chat",
					}}
					name='Chat'
					component={ChatScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});
