import {
  Alert,
} from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getStorage } from "firebase/storage";

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

import { useNetInfo } from "@react-native-community/netinfo";

import Start from "./components/Start";
import Chat from "./components/Chat";

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
      apiKey: "AIzaSyC37jUSY2qDSgXGj0x_fIrLosp5R2aFW3E",
    authDomain: "chat-app-ba239.firebaseapp.com",
    databaseURL: "https://chat-app-ba239-default-rtdb.firebaseio.com",
    projectId: "chat-app-ba239",
    storageBucket: "chat-app-ba239.appspot.com",
    messagingSenderId: "845671438149",
    appId: "1:845671438149:web:61862e9cf683a1b5a5d02c",
    measurementId: "G-C21KD3EWWF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;