import { StyleSheet, View } from "react-native";

import { SigninScreen } from "../screens/SigninScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onFirebaseAuthChange } from "../firebase/auth";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/features/userSlice";

export const ScreenSelector = () => {
  const Stack = createNativeStackNavigator();
  const userId = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onFirebaseAuthChange(dispatch);
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => false }}>
        {userId ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Signin" component={SigninScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
