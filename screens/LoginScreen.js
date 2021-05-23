import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image, Avatar } from "react-native-elements";
import { auth } from "../firebase";

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigation.replace("Home");
			}
		});
		return unsubscribe;
	}, []);

	const login = () => {
		auth.signInWithEmailAndPassword(email, password).catch((err) => {
			alert(err);
		});
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<StatusBar style='light' />
			<Image source={{ uri: "https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2020/05/sig-1200.png" }} style={{ width: 170, height: 170, borderRadius: 20 }} />
			<View style={styles.inputContainer}>
				<Input name='Email' type='email' placeholder='Email' autoFocus value={email} onChangeText={(text) => setEmail(text)} />
				<Input name='Password' placeholder='Password' secureTextEntry type='password' value={password} onChangeText={(text) => setPassword(text)} />
			</View>
			<Button
				containerStyle={styles.button}
				title='Login'
				onPress={() => {
					login();
				}}
			/>
			<Button
				containerStyle={styles.button}
				onPress={() => {
					navigation.navigate("Register");
				}}
				title='Register'
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
		marginTop: 10,
	},
	button: {
		width: 200,
		marginTop: 10,
	},
});
