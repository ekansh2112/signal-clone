import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
const AddChat = ({ navigation }) => {
	const [input, setInput] = useState("");
	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Chats",
		});
	});

	const createChat = async () => {
		await db
			.collection("chats")
			.add({
				chatName: input,
			})
			.then(() => {
				navigation.goBack();
			})
			.catch((err) => {
				alert(err);
			});
	};
	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "center",
				padding: 30,
			}}
		>
			<Input
				leftIcon={<Icon name='wechat' type='antdesign' size={24} color='black' />}
				placeholder='Enter Chat Name'
				value={input}
				onChangeText={(text) => setInput(text)}
				onSubmitEditing={createChat}
			/>
			<Button disabled={!input} title='Create a New Chat' onPress={createChat} />
		</View>
	);
};

export default AddChat;

const styles = StyleSheet.create({});
