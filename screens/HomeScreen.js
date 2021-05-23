import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
const HomeScreen = ({ navigation }) => {
	const [chats, setChats] = useState([]);

	const logout = () => {
		auth.signOut().then(() => {
			navigation.replace("Login");
		});
	};

	useEffect(() => {
		const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
		return unsubscribe;
	}, []);

	useLayoutEffect(() => {
		console.log("AUTH", auth?.currentUser?.photoURL);
		navigation.setOptions({
			title: "Signal",
			headerStyle: { backgroundColor: "white" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<View style={{ marginLeft: 20 }}>
					<TouchableOpacity>
						<Avatar
							onPress={() => {
								logout();
							}}
							rounded
							source={{
								uri: auth?.currentUser?.photoURL,
							}}
						/>
					</TouchableOpacity>
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
						<AntDesign name='camerao' size={24} color='black' />
					</TouchableOpacity>
					<TouchableOpacity>
						<SimpleLineIcons
							onPress={() => {
								navigation.navigate("AddChat");
							}}
							name='pencil'
							size={24}
							color='black'
						/>
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const enterChat = (id, chatName) => {
		navigation.navigate("Chat", {
			id,
			chatName,
		});
	};
	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				{chats.map(({ id, data: { chatName } }) => {
					return (
						<CustomListItem
							enterChat={() => {
								enterChat(id, chatName);
							}}
							id={id}
							key={id}
							chatName={chatName}
						/>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
export default HomeScreen;
