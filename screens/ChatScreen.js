import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { Avatar } from "react-native-elements";

const ChatScreen = ({ navigation, route }) => {
	console.log("length", firebase.apps.length);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Chat",
			headerTitleVisible: false,
			headerTitle: () => (
				<View>
					<Text
						style={{
							color: "white",
							fontSize: 20,
							fontWeight: "bold",
						}}
					>
						{route.params.chatName}
					</Text>
				</View>
			),
			headerRight: () => (
				<View
					style={{
						marginRight: 20,
						flexDirection: "row",
						justifyContent: "space-between",
						width: 80,
					}}
				>
					<TouchableOpacity>
						<AntDesign name='videocamera' size={24} color='white' />
					</TouchableOpacity>
					<TouchableOpacity>
						<Icon name='call' size={24} color='white' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const sendMessage = () => {
		Keyboard.dismiss();
		db.collection("chats").doc(route.params.id).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL,
		});
		setInput("");
	};

	useLayoutEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(route.params.id)
			.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
		return unsubscribe;
	}, [route]);
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "white",
			}}
		>
			<StatusBar style='light' />
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={90}>
				<>
					{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
					<ScrollView
						contentContainerStyle={{
							paddingTop: 15,
						}}
					>
						{messages.map(({ id, data }) =>
							data.email === auth.currentUser.email ? (
								<View key={id} style={styles.reciever}>
									<Avatar
										position='absolute'
										bottom={-15}
										right={-5}
										//for web
										containerStyle={{
											position: "absolute",
											bottom: -15,
											right: -5,
										}}
										size={30}
										rounded
										source={{
											uri: data.photoURL,
										}}
									/>
									<Text style={styles.recieverText}>{data.message}</Text>
									{/* <Text style={styles.recieverName}>{data.displayName}</Text> */}
								</View>
							) : (
								<View key={id} style={styles.sender}>
									<Avatar
										position='absolute'
										bottom={-15}
										left={-5}
										//for web
										containerStyle={{
											position: "absolute",
											bottom: -15,
											left: -5,
										}}
										size={30}
										rounded
										source={{
											uri: data.photoURL,
										}}
									/>
									<Text style={styles.senderText}>{data.message}</Text>
									<Text style={styles.senderName}>{data.displayName}</Text>
								</View>
							)
						)}
					</ScrollView>
					{/* </TouchableWithoutFeedback> */}
					<View style={styles.footer}>
						<TextInput
							value={input}
							onChangeText={(text) => {
								setInput(text);
							}}
							placeholder='Enter a Message'
							style={styles.textInput}
							onSubmitEditing={sendMessage}
						/>
						<TouchableOpacity onPress={() => sendMessage()}>
							<Icon name='send' size={24} color='blue' />
						</TouchableOpacity>
					</View>
				</>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	footer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		borderColor: "transparent",
		backgroundColor: "#ececec",
		borderWidth: 1,
		padding: 10,
		color: "gray",
		borderRadius: 30,
	},

	reciever: {
		alignSelf: "flex-end",
		position: "relative",
		maxWidth: "80%",
		padding: 10,
		marginRight: 20,
		marginBottom: 20,
		backgroundColor: "#ececec",
		borderRadius: 20,
		// flexDirection: "row-reverse",
	},
	recieverText: {
		color: "black",
		fontWeight: "500",
		marginLeft: 10,
	},
	// recieverName: {
	// 	right: 10,
	// 	paddingRight: 10,
	// 	color: "black",
	// },
	sender: {
		alignSelf: "flex-start",
		position: "relative",
		maxWidth: "80%",
		padding: 10,
		marginLeft: 20,
		marginBottom: 10,
		backgroundColor: "#2b68e6",
		borderRadius: 20,
	},
	senderText: {
		color: "black",
		fontWeight: "500",
		marginLeft: 10,
		marginBottom: 15,
	},
	senderName: {
		left: 10,
		paddingLeft: 10,
		color: "white",
	},
});
