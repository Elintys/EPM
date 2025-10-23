import  firebase  from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAR8Pl-eRAxg1CJ2svjPdF40idltJ-W66I",
  authDomain: "elintys-app.firebaseapp.com",
  projectId: "elintys-app",
  storageBucket: "elintys-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};

// Initialise Firebase si ce n’est pas déjà fait
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { auth };
