import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';

export type NavLoginStackParamList = {
  Login: undefined,
  SignUp: undefined,
  PasswordRecoveryScreen: undefined,
}

export type NavRootStackParamList = {
  Authentication: NavigatorScreenParams<NavLoginStackParamList>
}