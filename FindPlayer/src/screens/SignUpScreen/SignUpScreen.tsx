import React, {useState} from "react";
import {Button, Text, TextInput, View} from "react-native";
import realmDB from "./../../services/RealmDB";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {registerUserByEmailPassword, userRegisterMessage} from "./SignUpSlice";
// import {setUserName, username} from "../LoginScreen/LoginSlice";

// @ts-ignore
export default function SignUpScreen({navigation}) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const registerMessage = useSelector(userRegisterMessage);

  const createUser = async () => {
    dispatch(registerUserByEmailPassword({
      username,
      password
    }));
  }
  // const userName = useSelector(username);

  const onChangeText= () => {
    // dispatch(setUserName(text));
    navigation.navigate('Authentication', {
      screen: 'Login'
    });
  }

  return (
    <View>
      <TextInput
        placeholder='user'
        placeholderTextColor='red'
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder='password'
        placeholderTextColor='red'
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button title='Create' onPress={createUser}/>
      <Button title='GoToLogin' onPress={onChangeText}/>
      <Text>{t(registerMessage)}</Text>
      <Text>SIGNUP</Text>
    </View>
  )
}