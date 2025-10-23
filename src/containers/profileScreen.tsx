import React from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/user/userLogic";
import { AppDispatch, RootState } from "../store/store";

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   console.log('====================================');
  //   console.log("User: ",user);
  //   console.log('====================================');
  // }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <Text style={{ fontSize: 18 }}>Bienvenue {user.name}</Text>
          <Text>{user?.email}</Text>
          <Button title="Se déconnecter" onPress={() => dispatch(logoutUser())} />
        </>
      ) : (
        <Text>Aucun utilisateur connecté.</Text>
      )}
    </View>
  );
}
