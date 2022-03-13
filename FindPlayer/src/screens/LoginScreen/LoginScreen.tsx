import React, {useState} from "react";
import {View, Text, TextInput, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {userRegisterMessage,isLogged, registerUserByEmailPassword} from "./LoginSlice";
import realmDB from "./../../services/RealmDB";
import i18n from "i18next";
import {useTranslation} from "react-i18next";

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const registerMessage = useSelector(userRegisterMessage);

  // const onChangeText = async (text: string) => {
  //   dispatch(setUserName(text));
  //   await createUser();
  //   navigation.navigate('Authentication', {
  //     screen: 'SignUp'
  //   });
  // }



  const createUser = async () => {
  dispatch(registerUserByEmailPassword({
    username,
    password
  }));
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
      <Button title='Login' onPress={createUser}/>
      <Text>{t(registerMessage)}</Text>
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