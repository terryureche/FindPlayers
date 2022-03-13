import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavLoginStackParamList, NavRootStackParamList} from "./Navigation.types";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import React from "react";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";

const Navigation = () =>{
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Authentication">
        <MainStack.Screen
          name="Authentication"
          component={Authentication}
          options={{ headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;

const MainStack = createNativeStackNavigator<NavRootStackParamList>();

const AuthenticationStack = createNativeStackNavigator<NavLoginStackParamList>();

const Authentication = () => {
  return (
    <AuthenticationStack.Navigator initialRouteName="SignUp">
      <AuthenticationStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthenticationStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </AuthenticationStack.Navigator>
  )
}