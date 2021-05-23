import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text, Image, Avatar } from "react-native-elements";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
	// useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerBackTitle: "abc",
	// 	});
	// }, [navigation]);  //NOT WORKING !!!!!

	const [data, setData] = useState({
		fullname: "",
		email: "",
		password: "",
		profilepic: "",
	});
	const { fullname, email, password, profilepic } = data;

	const register = () => {
		auth.createUserWithEmailAndPassword(email.trim(), password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: fullname,
					photoURL: profilepic || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
				});
			})
			.catch((err) => {
				alert(err.message);
				// console.log(err.message);
			});
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<StatusBar style='light' />

			<Text style={{ marginTop: 20, marginBottom: 20, alignSelf: "center" }} h4>
				Create a Signal account.{" "}
			</Text>
			<View style={styles.inputContainer}>
				<Input
					value={fullname}
					type='text'
					onChangeText={(text) => {
						setData({ ...data, fullname: text });
					}}
					placeholder='Full Name'
				/>
				<Input
					type='email'
					value={email}
					onChangeText={(text) => {
						setData({ ...data, email: text });
					}}
					placeholder='Email'
				/>
				<Input
					type='password'
					value={password}
					secureTextEntry
					onChangeText={(text) => {
						setData({ ...data, password: text });
					}}
					placeholder='Password'
				/>
				<Input
					type='text'
					value={profilepic}
					onChangeText={(text) => {
						setData({ ...data, profilepic: text });
					}}
					placeholder='Profile Picture URL (Optional'
				/>
			</View>

			<Button
				title='Register'
				onPress={() => {
					register();
				}}
				containerStyle={styles.button}
			/>

			<View style={{ height: 40 }}></View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {
		width: 300,
	},
	button: {
		width: 300,
		marginTop: 10,
		alignSelf: "center",
	},
});
