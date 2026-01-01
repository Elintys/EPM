import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

// Initialise Firebase si ce n'est pas deja fait
if (!firebase.apps.length) {
  firebase.initializeApp();
}

const app = firebase.app();
const authInstance = auth(app);

export { app, authInstance };
