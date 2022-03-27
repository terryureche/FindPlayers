import React, {useState} from "react";
import {View, Text, TextInput, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {errorMessage, isLogged, loginUserByEmailPassword} from "./LoginSlice";
import realmDB from "./../../services/RealmDB";
import i18n, {use} from "i18next";
import {useTranslation} from "react-i18next";
import User = Realm.User;

// @ts-ignore
export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const isUserLogged = useSelector(isLogged);
  const loginErrorMessage = useSelector(errorMessage)

  const login = async () => {
    dispatch(loginUserByEmailPassword({
      username,
      password
    }))
  }

  const goToSignUpScreen = async () => {
    try {
      const credentials = Realm.Credentials.emailPassword(username, password);
      const user = await  realmDB.logIn(credentials);
      console.log(user.id);
    } catch (e) {
      console.log(e);
    }
  }
    // try {
    //   await realmDB.emailPasswordAuth.registerUser({
    //     email: username,
    //     password
    //   });
    // } catch (e) {
    //   if (e.code === 49) {
    //     console.log('user already exists');
    //   } else {
    //     console.log(e.message);
    //   }
    // }

    // try {
    // const result = Realm.Credentials.emailPassword(username,password);
    //   const result2 = await realmDB.logIn(result);
    //   console.log(result2);
    // } catch (e) {
    //   console.log(e.message);
    // }

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
      <Button title='Login' onPress={login}/>
      {/*<Button title={t('signup')} onPress={goToSignUpScreen}/>*/}
      <Text>{username}</Text>
      <Text>{password}</Text>
      <Text>{loginErrorMessage}</Text>
      <Text>LOGIN</Text>
    </View>
  )
}

// async function logInOrRegister(app, email, password) {
//   if (app.currentUser) {
//     await app.removeUser(app.currentUser);
//   }
//   const credentials = Realm.Credentials.emailPassword(email, password);
//   try {
//     // The await here is important to allow catching any error
//     return await app.logIn(credentials);
//   } catch (e) {
//     console.log("Log in failed:", e.error);
//     if (e.error === "confirmation required") {
//       await app.emailPasswordAuth.resendConfirmationEmail(email);
//       throw new Error("Confirmation mail has been sent");
//     } else if (e.error === "invalid username/password") {
//       try {
//         await app.emailPasswordAuth.registerUser(email, password);
//         return await app.logIn(credentials);
//       } catch (e2) {
//         console.log("Register followed by log in failed:", e2.error);
//         if (e2.error === "confirmation required") {
//           throw new Error("Confirmation mail has been sent");
//         } else if (e2.error === "name already in use") {
//           throw new Error("Invalid password!");
//         } else {
//           throw e2;
//         }
//       }
//     } else {
//       throw e;
//     }
//   }
// }