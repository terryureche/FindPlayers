import React from "react";
import {Text, TextInput, View} from "react-native";
import realmDB from "./../../services/RealmDB";
import {useDispatch, useSelector} from "react-redux";
// import {setUserName, username} from "../LoginScreen/LoginSlice";

export default function SignUpScreen({navigation}) {
  const dispatch = useDispatch();
  // const userName = useSelector(username);

    const onChangeText= (text: string) => {
      // dispatch(setUserName(text));
      navigation.navigate('Authentication', {
        screen: 'Login'
      });
    }

  return (
    <View>
      <TextInput
        onChangeText={text => onChangeText(text)}
      />
      {/*<Text>{userName}</Text>*/}
      <Text>SIGNUP</Text>
    </View>
  )
}