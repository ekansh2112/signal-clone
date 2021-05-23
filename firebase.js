import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAUr510yrboMfvdf_Q3QVTT5aHJRA4roa0",
	authDomain: "signal-clone-eg.firebaseapp.com",
	projectId: "signal-clone-eg",
	storageBucket: "signal-clone-eg.appspot.com",
	messagingSenderId: "761697028464",
	appId: "1:761697028464:web:eab9122c6ec9986dad27b5",
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
